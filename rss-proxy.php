<?php
header('Content-Type: application/json');

$url = $_GET['url'] ?? '';

if (!$url || !filter_var($url, FILTER_VALIDATE_URL)) {
    echo json_encode(['error' => 'Invalid or missing URL']);
    exit;
}

$context = stream_context_create(['http' => ['timeout' => 5]]);
$feedContent = @file_get_contents($url, false, $context);

if (!$feedContent) {
    echo json_encode(['error' => 'Feed could not be loaded']);
    exit;
}

libxml_use_internal_errors(true);
$xml = simplexml_load_string($feedContent);

if (!$xml) {
    echo json_encode(['error' => 'Invalid RSS feed']);
    exit;
}

$items = [];
$favicon = null;

function find_favicon($feed_url) {
    $parsed = parse_url($feed_url);
    if (!isset($parsed['scheme']) || !isset($parsed['host'])) return null;
    $base = $parsed['scheme'] . '://' . $parsed['host'];
    $homepage = @file_get_contents($base, false, stream_context_create(['http' => ['timeout' => 5]]));
    if (!$homepage) return $base . '/favicon.ico';
    if (preg_match_all('/<link[^>]+rel=["\']?([^"\'>]+)["\']?[^>]*>/i', $homepage, $matches, PREG_SET_ORDER)) {
        foreach ($matches as $m) {
            if (preg_match('/icon/i', $m[1])) {
                if (preg_match('/href=["\']?([^"\'> ]+)["\']?/i', $m[0], $href)) {
                    $href_val = $href[1];
                    if (strpos($href_val, 'http') === 0) {
                        return $href_val;
                    } elseif (strpos($href_val, '//') === 0) {
                        return $parsed['scheme'] . ':' . $href_val;
                    } elseif (strpos($href_val, '/') === 0) {
                        return $base . $href_val;
                    } else {
                        return $base . '/' . $href_val;
                    }
                }
            }
        }
    }
    return $base . '/favicon.ico';
}

if (isset($xml->channel->item)) {
    foreach ($xml->channel->item as $item) {
        $desc = (string)$item->description;
        $img = null;
        if (isset($item->children('media', true)->content)) {
            $media = $item->children('media', true)->content;
            $img = (string)$media->attributes()->url;
        } elseif (isset($item->enclosure)) {
            $img = (string)$item->enclosure->attributes()->url;
        }
        $items[] = [
            'title' => (string)$item->title,
            'link' => (string)$item->link,
            'pubDate' => (string)$item->pubDate,
            'description' => $desc,
            'image' => $img,
        ];
    }
    $favicon = find_favicon((string)$xml->channel->link ?: $url);
}
elseif (isset($xml->entry)) {
    foreach ($xml->entry as $entry) {
        $title = (string)$entry->title;
        $link = '';
        foreach ($entry->link as $l) {
            $attrs = $l->attributes();
            if (isset($attrs['rel']) && $attrs['rel'] == 'alternate') {
                $link = (string)$attrs['href'];
                break;
            }
            if (!$link && isset($attrs['href'])) {
                $link = (string)$attrs['href'];
            }
        }
        $pubDate = (string)$entry->updated ?: (string)$entry->published;
        $desc = (string)$entry->summary ?: (string)$entry->content;
        $items[] = [
            'title' => $title,
            'link' => $link,
            'pubDate' => $pubDate,
            'description' => $desc,
            'image' => null,
        ];
    }
    $feedLink = isset($xml->link) ? (string)$xml->link[0]->attributes()->href : $url;
    $favicon = find_favicon($feedLink);
}

echo json_encode(['items' => $items, 'favicon' => $favicon]);
