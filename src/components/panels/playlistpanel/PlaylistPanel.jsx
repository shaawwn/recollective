import {useContext, useEffect, useState} from 'react';
import {PropTypes} from 'prop-types';
import useSearch from '../../../hooks/useSearch'
// import './playlist.css'
// import DefaultPlaylistCover from '../../../images/default.png'

import PlaylistHeader from './PlaylistHeader'
import SearchInput from '../../search/SearchInput'
import SearchDropdown from '../../search/SearchDropdown'
import TrackTable from '../../tracktable/TrackTable'

// import {PanelFunctionContext} from '../../utility/containers/PanelContainer'
import {UserContext} from '../../views/dashboard/Dashboard'
import {AuthContext} from '../../../App'
import usePlaylist from '../../../hooks/usePlaylist'


// const PLAYLIST = {
//     "author": "shawn",
//     "tags": ["ambient", "ethereal", "lofi"],
//     "collaborative": false,
//     "description": "Sail the frigid seas of the Skellige Isles",
//     "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/5lKuPov6qxMLVqP8wzxvBX"
//     },
//     "href": "https://api.spotify.com/v1/playlists/5lKuPov6qxMLVqP8wzxvBX",
//     "id": "5lKuPov6qxMLVqP8wzxvBX",
//     "images": [
//         {
//             "height": null,
//             "url": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebbebe177855eef64a5ed4f643a",
//             "width": null
//         }
//     ],
//     "name": "Skellige Ambient",
//     "owner": {
//         "display_name": "Shaaawn",
//         "external_urls": {
//             "spotify": "https://open.spotify.com/user/maeksevhin"
//         },
//         "href": "https://api.spotify.com/v1/users/maeksevhin",
//         "id": "maeksevhin",
//         "type": "user",
//         "uri": "spotify:user:maeksevhin"
//     },
//     "primary_color": null,
//     "public": null,
//     "snapshot_id": "MjQsNDYwNTg1NjJiZDE0Zjk0NjUyYWFhMTk0YjBlNWIzMGNmNGNkYTRiNA==",
//     "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/5lKuPov6qxMLVqP8wzxvBX/tracks",
//         "total": 13
//     },
//     "type": "playlist",
//     "uri": "spotify:playlist:5lKuPov6qxMLVqP8wzxvBX"
// }

// const TRACKS = {
//     "tracks" : [ {
//       "album" : {
//         "album_type" : "ALBUM",
//         "artists" : [ {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/07vycW8ICLf5hKb22PFWXw"
//           },
//           "href" : "https://api.spotify.com/v1/artists/07vycW8ICLf5hKb22PFWXw",
//           "id" : "07vycW8ICLf5hKb22PFWXw",
//           "name" : "Marcin Przybyłowicz",
//           "type" : "artist",
//           "uri" : "spotify:artist:07vycW8ICLf5hKb22PFWXw"
//         }, {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/6lGCmXtqSxze8o2KEfYD6D"
//           },
//           "href" : "https://api.spotify.com/v1/artists/6lGCmXtqSxze8o2KEfYD6D",
//           "id" : "6lGCmXtqSxze8o2KEfYD6D",
//           "name" : "Mikolai Stroinski",
//           "type" : "artist",
//           "uri" : "spotify:artist:6lGCmXtqSxze8o2KEfYD6D"
//         }, {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/4IVoqcr2G4cE9tH7crHsfE"
//           },
//           "href" : "https://api.spotify.com/v1/artists/4IVoqcr2G4cE9tH7crHsfE",
//           "id" : "4IVoqcr2G4cE9tH7crHsfE",
//           "name" : "Piotr Musiał",
//           "type" : "artist",
//           "uri" : "spotify:artist:4IVoqcr2G4cE9tH7crHsfE"
//         } ],
//         "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/album/1C1wp0FcQRAU74VfkDWwSV"
//         },
//         "href" : "https://api.spotify.com/v1/albums/1C1wp0FcQRAU74VfkDWwSV",
//         "id" : "1C1wp0FcQRAU74VfkDWwSV",
//         "images" : [ {
//           "height" : 640,
//           "url" : "https://i.scdn.co/image/ab67616d0000b27389c3692370b29d8fd4bab431",
//           "width" : 640
//         }, {
//           "height" : 300,
//           "url" : "https://i.scdn.co/image/ab67616d00001e0289c3692370b29d8fd4bab431",
//           "width" : 300
//         }, {
//           "height" : 64,
//           "url" : "https://i.scdn.co/image/ab67616d0000485189c3692370b29d8fd4bab431",
//           "width" : 64
//         } ],
//         "name" : "The Witcher 3: Wild Hunt - Blood and Wine (Official Soundtrack)",
//         "release_date" : "2016-06-01",
//         "release_date_precision" : "day",
//         "total_tracks" : 25,
//         "type" : "album",
//         "uri" : "spotify:album:1C1wp0FcQRAU74VfkDWwSV"
//       },
//       "artists" : [ {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/4IVoqcr2G4cE9tH7crHsfE"
//         },
//         "href" : "https://api.spotify.com/v1/artists/4IVoqcr2G4cE9tH7crHsfE",
//         "id" : "4IVoqcr2G4cE9tH7crHsfE",
//         "name" : "Piotr Musiał",
//         "type" : "artist",
//         "uri" : "spotify:artist:4IVoqcr2G4cE9tH7crHsfE"
//       } ],
//       "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//       "disc_number" : 1,
//       "duration_ms" : 125000,
//       "explicit" : false,
//       "external_ids" : {
//         "isrc" : "PLI367712740"
//       },
//       "external_urls" : {
//         "spotify" : "https://open.spotify.com/track/6wxZ0NU8FxeO6QRSNSBCCS"
//       },
//       "href" : "https://api.spotify.com/v1/tracks/6wxZ0NU8FxeO6QRSNSBCCS",
//       "id" : "6wxZ0NU8FxeO6QRSNSBCCS",
//       "is_local" : false,
//       "name" : "The Moon Over Mount Gorgon",
//       "popularity" : 43,
//       "preview_url" : "https://p.scdn.co/mp3-preview/7ed1b6a23064b0dc917b370f2e5ad493015c889c?cid=02fc8d8e87dc40a89395a26008c487ac",
//       "track_number" : 15,
//       "type" : "track",
//       "uri" : "spotify:track:6wxZ0NU8FxeO6QRSNSBCCS"
//     }, {
//       "album" : {
//         "album_type" : "ALBUM",
//         "artists" : [ {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/3refNRo1fb7DLZi9rGUEo9"
//           },
//           "href" : "https://api.spotify.com/v1/artists/3refNRo1fb7DLZi9rGUEo9",
//           "id" : "3refNRo1fb7DLZi9rGUEo9",
//           "name" : "Jan Valta",
//           "type" : "artist",
//           "uri" : "spotify:artist:3refNRo1fb7DLZi9rGUEo9"
//         }, {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/1tfJNGH0H6MudsgqCS7DS4"
//           },
//           "href" : "https://api.spotify.com/v1/artists/1tfJNGH0H6MudsgqCS7DS4",
//           "id" : "1tfJNGH0H6MudsgqCS7DS4",
//           "name" : "Adam Sporka",
//           "type" : "artist",
//           "uri" : "spotify:artist:1tfJNGH0H6MudsgqCS7DS4"
//         } ],
//         "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/album/0XvTyYwQQhNXYFPbsCzmrg"
//         },
//         "href" : "https://api.spotify.com/v1/albums/0XvTyYwQQhNXYFPbsCzmrg",
//         "id" : "0XvTyYwQQhNXYFPbsCzmrg",
//         "images" : [ {
//           "height" : 640,
//           "url" : "https://i.scdn.co/image/ab67616d0000b27333e0e068c7cf9bb9805815bf",
//           "width" : 640
//         }, {
//           "height" : 300,
//           "url" : "https://i.scdn.co/image/ab67616d00001e0233e0e068c7cf9bb9805815bf",
//           "width" : 300
//         }, {
//           "height" : 64,
//           "url" : "https://i.scdn.co/image/ab67616d0000485133e0e068c7cf9bb9805815bf",
//           "width" : 64
//         } ],
//         "name" : "Kingdom Come: Deliverance (Original Soundtrack Essentials)",
//         "release_date" : "2018-02-13",
//         "release_date_precision" : "day",
//         "total_tracks" : 23,
//         "type" : "album",
//         "uri" : "spotify:album:0XvTyYwQQhNXYFPbsCzmrg"
//       },
//       "artists" : [ {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/3refNRo1fb7DLZi9rGUEo9"
//         },
//         "href" : "https://api.spotify.com/v1/artists/3refNRo1fb7DLZi9rGUEo9",
//         "id" : "3refNRo1fb7DLZi9rGUEo9",
//         "name" : "Jan Valta",
//         "type" : "artist",
//         "uri" : "spotify:artist:3refNRo1fb7DLZi9rGUEo9"
//       }, {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/1tfJNGH0H6MudsgqCS7DS4"
//         },
//         "href" : "https://api.spotify.com/v1/artists/1tfJNGH0H6MudsgqCS7DS4",
//         "id" : "1tfJNGH0H6MudsgqCS7DS4",
//         "name" : "Adam Sporka",
//         "type" : "artist",
//         "uri" : "spotify:artist:1tfJNGH0H6MudsgqCS7DS4"
//       } ],
//       "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//       "disc_number" : 1,
//       "duration_ms" : 177587,
//       "explicit" : false,
//       "external_ids" : {
//         "isrc" : "QZARB1838135"
//       },
//       "external_urls" : {
//         "spotify" : "https://open.spotify.com/track/6HJRVjBVFfMj2Ln59txSf0"
//       },
//       "href" : "https://api.spotify.com/v1/tracks/6HJRVjBVFfMj2Ln59txSf0",
//       "id" : "6HJRVjBVFfMj2Ln59txSf0",
//       "is_local" : false,
//       "name" : "Dream About Father",
//       "popularity" : 26,
//       "preview_url" : "https://p.scdn.co/mp3-preview/0fb67397d4ba85450d5f23bd8e3f2910a159407a?cid=02fc8d8e87dc40a89395a26008c487ac",
//       "track_number" : 22,
//       "type" : "track",
//       "uri" : "spotify:track:6HJRVjBVFfMj2Ln59txSf0"
//     }, {
//       "album" : {
//         "album_type" : "SINGLE",
//         "artists" : [ {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/5iqtjaKco1oUuo6HNcLj2v"
//           },
//           "href" : "https://api.spotify.com/v1/artists/5iqtjaKco1oUuo6HNcLj2v",
//           "id" : "5iqtjaKco1oUuo6HNcLj2v",
//           "name" : "Ulk",
//           "type" : "artist",
//           "uri" : "spotify:artist:5iqtjaKco1oUuo6HNcLj2v"
//         } ],
//         "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/album/5UvvCNpKCR8O96S9NkciE9"
//         },
//         "href" : "https://api.spotify.com/v1/albums/5UvvCNpKCR8O96S9NkciE9",
//         "id" : "5UvvCNpKCR8O96S9NkciE9",
//         "images" : [ {
//           "height" : 640,
//           "url" : "https://i.scdn.co/image/ab67616d0000b273effcf316ec40bb8ae5e3fdda",
//           "width" : 640
//         }, {
//           "height" : 300,
//           "url" : "https://i.scdn.co/image/ab67616d00001e02effcf316ec40bb8ae5e3fdda",
//           "width" : 300
//         }, {
//           "height" : 64,
//           "url" : "https://i.scdn.co/image/ab67616d00004851effcf316ec40bb8ae5e3fdda",
//           "width" : 64
//         } ],
//         "name" : "Ulk I",
//         "release_date" : "2019-03-07",
//         "release_date_precision" : "day",
//         "total_tracks" : 6,
//         "type" : "album",
//         "uri" : "spotify:album:5UvvCNpKCR8O96S9NkciE9"
//       },
//       "artists" : [ {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/5iqtjaKco1oUuo6HNcLj2v"
//         },
//         "href" : "https://api.spotify.com/v1/artists/5iqtjaKco1oUuo6HNcLj2v",
//         "id" : "5iqtjaKco1oUuo6HNcLj2v",
//         "name" : "Ulk",
//         "type" : "artist",
//         "uri" : "spotify:artist:5iqtjaKco1oUuo6HNcLj2v"
//       } ],
//       "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//       "disc_number" : 1,
//       "duration_ms" : 247272,
//       "explicit" : false,
//       "external_ids" : {
//         "isrc" : "QZFZ41986681"
//       },
//       "external_urls" : {
//         "spotify" : "https://open.spotify.com/track/7wwTl4GblWYMTW1GmUL6GX"
//       },
//       "href" : "https://api.spotify.com/v1/tracks/7wwTl4GblWYMTW1GmUL6GX",
//       "id" : "7wwTl4GblWYMTW1GmUL6GX",
//       "is_local" : false,
//       "name" : "Tortoise VI",
//       "popularity" : 14,
//       "preview_url" : "https://p.scdn.co/mp3-preview/6ec18be72517af418ed5d24d6097d12eddec69b0?cid=02fc8d8e87dc40a89395a26008c487ac",
//       "track_number" : 6,
//       "type" : "track",
//       "uri" : "spotify:track:7wwTl4GblWYMTW1GmUL6GX"
//     }, {
//       "album" : {
//         "album_type" : "ALBUM",
//         "artists" : [ {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/0WgwTXh66Tz9hSU7LjZsww"
//           },
//           "href" : "https://api.spotify.com/v1/artists/0WgwTXh66Tz9hSU7LjZsww",
//           "id" : "0WgwTXh66Tz9hSU7LjZsww",
//           "name" : "Brad Derrick",
//           "type" : "artist",
//           "uri" : "spotify:artist:0WgwTXh66Tz9hSU7LjZsww"
//         } ],
//         "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CG", "TJ", "VE", "ET" ],
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/album/344eglp8ljoVpPiZtnkSUJ"
//         },
//         "href" : "https://api.spotify.com/v1/albums/344eglp8ljoVpPiZtnkSUJ",
//         "id" : "344eglp8ljoVpPiZtnkSUJ",
//         "images" : [ {
//           "height" : 640,
//           "url" : "https://i.scdn.co/image/ab67616d0000b273a7e8bb34c84093c0211881cc",
//           "width" : 640
//         }, {
//           "height" : 300,
//           "url" : "https://i.scdn.co/image/ab67616d00001e02a7e8bb34c84093c0211881cc",
//           "width" : 300
//         }, {
//           "height" : 64,
//           "url" : "https://i.scdn.co/image/ab67616d00004851a7e8bb34c84093c0211881cc",
//           "width" : 64
//         } ],
//         "name" : "The Elder Scrolls Online: Morrowind (Original Game Soundtrack)",
//         "release_date" : "2017-06-07",
//         "release_date_precision" : "day",
//         "total_tracks" : 14,
//         "type" : "album",
//         "uri" : "spotify:album:344eglp8ljoVpPiZtnkSUJ"
//       },
//       "artists" : [ {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/0WgwTXh66Tz9hSU7LjZsww"
//         },
//         "href" : "https://api.spotify.com/v1/artists/0WgwTXh66Tz9hSU7LjZsww",
//         "id" : "0WgwTXh66Tz9hSU7LjZsww",
//         "name" : "Brad Derrick",
//         "type" : "artist",
//         "uri" : "spotify:artist:0WgwTXh66Tz9hSU7LjZsww"
//       }, {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/77yY2QmM6bYvjJ3y5L2R0v"
//         },
//         "href" : "https://api.spotify.com/v1/artists/77yY2QmM6bYvjJ3y5L2R0v",
//         "id" : "77yY2QmM6bYvjJ3y5L2R0v",
//         "name" : "Jeremy Soule",
//         "type" : "artist",
//         "uri" : "spotify:artist:77yY2QmM6bYvjJ3y5L2R0v"
//       } ],
//       "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CG", "TJ", "VE", "ET" ],
//       "disc_number" : 1,
//       "duration_ms" : 301377,
//       "explicit" : false,
//       "external_ids" : {
//         "isrc" : "QMTH31700028"
//       },
//       "external_urls" : {
//         "spotify" : "https://open.spotify.com/track/4dCOHVQRRay8ldlP4TtCI1"
//       },
//       "href" : "https://api.spotify.com/v1/tracks/4dCOHVQRRay8ldlP4TtCI1",
//       "id" : "4dCOHVQRRay8ldlP4TtCI1",
//       "is_local" : false,
//       "name" : "Grazelands Dawn (feat. Jeremy Soule)",
//       "popularity" : 44,
//       "preview_url" : "https://p.scdn.co/mp3-preview/66557f2bfb29bb6d1ad68decc3d77d470ea740e5?cid=02fc8d8e87dc40a89395a26008c487ac",
//       "track_number" : 14,
//       "type" : "track",
//       "uri" : "spotify:track:4dCOHVQRRay8ldlP4TtCI1"
//     }, {
//       "album" : {
//         "album_type" : "ALBUM",
//         "artists" : [ {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/1VPqJ10EqqXOQNDw1ppYeh"
//           },
//           "href" : "https://api.spotify.com/v1/artists/1VPqJ10EqqXOQNDw1ppYeh",
//           "id" : "1VPqJ10EqqXOQNDw1ppYeh",
//           "name" : "Chance Thomas",
//           "type" : "artist",
//           "uri" : "spotify:artist:1VPqJ10EqqXOQNDw1ppYeh"
//         } ],
//         "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/album/1lkI0MpnnccE364waiYGOY"
//         },
//         "href" : "https://api.spotify.com/v1/albums/1lkI0MpnnccE364waiYGOY",
//         "id" : "1lkI0MpnnccE364waiYGOY",
//         "images" : [ {
//           "height" : 640,
//           "url" : "https://i.scdn.co/image/ab67616d0000b273b4aef01821cb420e2e1ee2e3",
//           "width" : 640
//         }, {
//           "height" : 300,
//           "url" : "https://i.scdn.co/image/ab67616d00001e02b4aef01821cb420e2e1ee2e3",
//           "width" : 300
//         }, {
//           "height" : 64,
//           "url" : "https://i.scdn.co/image/ab67616d00004851b4aef01821cb420e2e1ee2e3",
//           "width" : 64
//         } ],
//         "name" : "The Lord of the Rings Online (10th Anniversary Commemorative Soundtrack)",
//         "release_date" : "2017-06-16",
//         "release_date_precision" : "day",
//         "total_tracks" : 26,
//         "type" : "album",
//         "uri" : "spotify:album:1lkI0MpnnccE364waiYGOY"
//       },
//       "artists" : [ {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/1VPqJ10EqqXOQNDw1ppYeh"
//         },
//         "href" : "https://api.spotify.com/v1/artists/1VPqJ10EqqXOQNDw1ppYeh",
//         "id" : "1VPqJ10EqqXOQNDw1ppYeh",
//         "name" : "Chance Thomas",
//         "type" : "artist",
//         "uri" : "spotify:artist:1VPqJ10EqqXOQNDw1ppYeh"
//       } ],
//       "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//       "disc_number" : 1,
//       "duration_ms" : 96222,
//       "explicit" : false,
//       "external_ids" : {
//         "isrc" : "QMKUJ1700001"
//       },
//       "external_urls" : {
//         "spotify" : "https://open.spotify.com/track/7g06UMTFv5CX26d5Cz6TkX"
//       },
//       "href" : "https://api.spotify.com/v1/tracks/7g06UMTFv5CX26d5Cz6TkX",
//       "id" : "7g06UMTFv5CX26d5Cz6TkX",
//       "is_local" : false,
//       "name" : "The House of Tom Bombadil",
//       "popularity" : 44,
//       "preview_url" : "https://p.scdn.co/mp3-preview/0e875122e1604776d64a0fdd990bed448b0f9c9a?cid=02fc8d8e87dc40a89395a26008c487ac",
//       "track_number" : 1,
//       "type" : "track",
//       "uri" : "spotify:track:7g06UMTFv5CX26d5Cz6TkX"
//     }, {
//       "album" : {
//         "album_type" : "ALBUM",
//         "artists" : [ {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/7FzXqfhbeFzALmcyi1j90U"
//           },
//           "href" : "https://api.spotify.com/v1/artists/7FzXqfhbeFzALmcyi1j90U",
//           "id" : "7FzXqfhbeFzALmcyi1j90U",
//           "name" : "Joris de Man",
//           "type" : "artist",
//           "uri" : "spotify:artist:7FzXqfhbeFzALmcyi1j90U"
//         }, {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/633wBWQrbgm4Tugw7MmsgA"
//           },
//           "href" : "https://api.spotify.com/v1/artists/633wBWQrbgm4Tugw7MmsgA",
//           "id" : "633wBWQrbgm4Tugw7MmsgA",
//           "name" : "The Flight",
//           "type" : "artist",
//           "uri" : "spotify:artist:633wBWQrbgm4Tugw7MmsgA"
//         }, {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/5PcieKHIXvRQ73ooTBA7eh"
//           },
//           "href" : "https://api.spotify.com/v1/artists/5PcieKHIXvRQ73ooTBA7eh",
//           "id" : "5PcieKHIXvRQ73ooTBA7eh",
//           "name" : "Niels van der Leest",
//           "type" : "artist",
//           "uri" : "spotify:artist:5PcieKHIXvRQ73ooTBA7eh"
//         } ],
//         "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/album/1tnJU98uHAWkkAsRekqtTe"
//         },
//         "href" : "https://api.spotify.com/v1/albums/1tnJU98uHAWkkAsRekqtTe",
//         "id" : "1tnJU98uHAWkkAsRekqtTe",
//         "images" : [ {
//           "height" : 640,
//           "url" : "https://i.scdn.co/image/ab67616d0000b2732523b2f62d91b1c9a82a0645",
//           "width" : 640
//         }, {
//           "height" : 300,
//           "url" : "https://i.scdn.co/image/ab67616d00001e022523b2f62d91b1c9a82a0645",
//           "width" : 300
//         }, {
//           "height" : 64,
//           "url" : "https://i.scdn.co/image/ab67616d000048512523b2f62d91b1c9a82a0645",
//           "width" : 64
//         } ],
//         "name" : "Horizon Zero Dawn (Original Soundtrack)",
//         "release_date" : "2017",
//         "release_date_precision" : "year",
//         "total_tracks" : 80,
//         "type" : "album",
//         "uri" : "spotify:album:1tnJU98uHAWkkAsRekqtTe"
//       },
//       "artists" : [ {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/7FzXqfhbeFzALmcyi1j90U"
//         },
//         "href" : "https://api.spotify.com/v1/artists/7FzXqfhbeFzALmcyi1j90U",
//         "id" : "7FzXqfhbeFzALmcyi1j90U",
//         "name" : "Joris de Man",
//         "type" : "artist",
//         "uri" : "spotify:artist:7FzXqfhbeFzALmcyi1j90U"
//       } ],
//       "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//       "disc_number" : 3,
//       "duration_ms" : 247384,
//       "explicit" : false,
//       "external_ids" : {
//         "isrc" : "GB9TP1501630"
//       },
//       "external_urls" : {
//         "spotify" : "https://open.spotify.com/track/1skHUGfztcMPVR8netKTeE"
//       },
//       "href" : "https://api.spotify.com/v1/tracks/1skHUGfztcMPVR8netKTeE",
//       "id" : "1skHUGfztcMPVR8netKTeE",
//       "is_local" : false,
//       "name" : "City On The Mesa - Part 3 - Onwards to Meridian",
//       "popularity" : 34,
//       "preview_url" : "https://p.scdn.co/mp3-preview/52f2c4b261bd6b90ec9fbaf17d20d91205ad91fc?cid=02fc8d8e87dc40a89395a26008c487ac",
//       "track_number" : 3,
//       "type" : "track",
//       "uri" : "spotify:track:1skHUGfztcMPVR8netKTeE"
//     }, {
//       "album" : {
//         "album_type" : "ALBUM",
//         "artists" : [ {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/3wlYEOHZHxMKPAyoGC1BFz"
//           },
//           "href" : "https://api.spotify.com/v1/artists/3wlYEOHZHxMKPAyoGC1BFz",
//           "id" : "3wlYEOHZHxMKPAyoGC1BFz",
//           "name" : "Adam Skorupa",
//           "type" : "artist",
//           "uri" : "spotify:artist:3wlYEOHZHxMKPAyoGC1BFz"
//         }, {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/47RTV4mRN9dDNbqxB1IMXF"
//           },
//           "href" : "https://api.spotify.com/v1/artists/47RTV4mRN9dDNbqxB1IMXF",
//           "id" : "47RTV4mRN9dDNbqxB1IMXF",
//           "name" : "Krzysztof Wierzynkiewicz",
//           "type" : "artist",
//           "uri" : "spotify:artist:47RTV4mRN9dDNbqxB1IMXF"
//         } ],
//         "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/album/0dAhuTx13ciZIXgan98X7Z"
//         },
//         "href" : "https://api.spotify.com/v1/albums/0dAhuTx13ciZIXgan98X7Z",
//         "id" : "0dAhuTx13ciZIXgan98X7Z",
//         "images" : [ {
//           "height" : 640,
//           "url" : "https://i.scdn.co/image/ab67616d0000b27364acfad0756b025aa0ff497e",
//           "width" : 640
//         }, {
//           "height" : 300,
//           "url" : "https://i.scdn.co/image/ab67616d00001e0264acfad0756b025aa0ff497e",
//           "width" : 300
//         }, {
//           "height" : 64,
//           "url" : "https://i.scdn.co/image/ab67616d0000485164acfad0756b025aa0ff497e",
//           "width" : 64
//         } ],
//         "name" : "The Witcher 2: Assassins Of Kings (Enhanced Edition) [Original Game Soundtrack]",
//         "release_date" : "2015-09-09",
//         "release_date_precision" : "day",
//         "total_tracks" : 47,
//         "type" : "album",
//         "uri" : "spotify:album:0dAhuTx13ciZIXgan98X7Z"
//       },
//       "artists" : [ {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/3wlYEOHZHxMKPAyoGC1BFz"
//         },
//         "href" : "https://api.spotify.com/v1/artists/3wlYEOHZHxMKPAyoGC1BFz",
//         "id" : "3wlYEOHZHxMKPAyoGC1BFz",
//         "name" : "Adam Skorupa",
//         "type" : "artist",
//         "uri" : "spotify:artist:3wlYEOHZHxMKPAyoGC1BFz"
//       }, {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/47RTV4mRN9dDNbqxB1IMXF"
//         },
//         "href" : "https://api.spotify.com/v1/artists/47RTV4mRN9dDNbqxB1IMXF",
//         "id" : "47RTV4mRN9dDNbqxB1IMXF",
//         "name" : "Krzysztof Wierzynkiewicz",
//         "type" : "artist",
//         "uri" : "spotify:artist:47RTV4mRN9dDNbqxB1IMXF"
//       } ],
//       "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//       "disc_number" : 1,
//       "duration_ms" : 224842,
//       "explicit" : false,
//       "external_ids" : {
//         "isrc" : "PLI364217900"
//       },
//       "external_urls" : {
//         "spotify" : "https://open.spotify.com/track/1urjM7slOfbkXTyYEeXetJ"
//       },
//       "href" : "https://api.spotify.com/v1/tracks/1urjM7slOfbkXTyYEeXetJ",
//       "id" : "1urjM7slOfbkXTyYEeXetJ",
//       "is_local" : false,
//       "name" : "Blue Mountains - Edit Version",
//       "popularity" : 35,
//       "preview_url" : "https://p.scdn.co/mp3-preview/9203b677dbfa189337cf862afbbdd516b216e71a?cid=02fc8d8e87dc40a89395a26008c487ac",
//       "track_number" : 11,
//       "type" : "track",
//       "uri" : "spotify:track:1urjM7slOfbkXTyYEeXetJ"
//     }, {
//       "album" : {
//         "album_type" : "ALBUM",
//         "artists" : [ {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/3wENndPAPACVtaHTFogPUI"
//           },
//           "href" : "https://api.spotify.com/v1/artists/3wENndPAPACVtaHTFogPUI",
//           "id" : "3wENndPAPACVtaHTFogPUI",
//           "name" : "Hole Dweller",
//           "type" : "artist",
//           "uri" : "spotify:artist:3wENndPAPACVtaHTFogPUI"
//         } ],
//         "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/album/0Drfy7RDYHwuju5aStI7dV"
//         },
//         "href" : "https://api.spotify.com/v1/albums/0Drfy7RDYHwuju5aStI7dV",
//         "id" : "0Drfy7RDYHwuju5aStI7dV",
//         "images" : [ {
//           "height" : 640,
//           "url" : "https://i.scdn.co/image/ab67616d0000b2738b3ffacb85c335faeb0c2cd7",
//           "width" : 640
//         }, {
//           "height" : 300,
//           "url" : "https://i.scdn.co/image/ab67616d00001e028b3ffacb85c335faeb0c2cd7",
//           "width" : 300
//         }, {
//           "height" : 64,
//           "url" : "https://i.scdn.co/image/ab67616d000048518b3ffacb85c335faeb0c2cd7",
//           "width" : 64
//         } ],
//         "name" : "Flies the Coop",
//         "release_date" : "2019-08-19",
//         "release_date_precision" : "day",
//         "total_tracks" : 10,
//         "type" : "album",
//         "uri" : "spotify:album:0Drfy7RDYHwuju5aStI7dV"
//       },
//       "artists" : [ {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/3wENndPAPACVtaHTFogPUI"
//         },
//         "href" : "https://api.spotify.com/v1/artists/3wENndPAPACVtaHTFogPUI",
//         "id" : "3wENndPAPACVtaHTFogPUI",
//         "name" : "Hole Dweller",
//         "type" : "artist",
//         "uri" : "spotify:artist:3wENndPAPACVtaHTFogPUI"
//       } ],
//       "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//       "disc_number" : 1,
//       "duration_ms" : 197857,
//       "explicit" : false,
//       "external_ids" : {
//         "isrc" : "QZNJV2082641"
//       },
//       "external_urls" : {
//         "spotify" : "https://open.spotify.com/track/64bsRcnMoSLlhrbIQ0XxB2"
//       },
//       "href" : "https://api.spotify.com/v1/tracks/64bsRcnMoSLlhrbIQ0XxB2",
//       "id" : "64bsRcnMoSLlhrbIQ0XxB2",
//       "is_local" : false,
//       "name" : "Through the Bindbole Wood",
//       "popularity" : 17,
//       "preview_url" : "https://p.scdn.co/mp3-preview/c68d6696f1780db35dc6a55a8031e6c28c66c7a1?cid=02fc8d8e87dc40a89395a26008c487ac",
//       "track_number" : 8,
//       "type" : "track",
//       "uri" : "spotify:track:64bsRcnMoSLlhrbIQ0XxB2"
//     }, {
//       "album" : {
//         "album_type" : "ALBUM",
//         "artists" : [ {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/0Y6BrKJLS3zVjM9IhevDgK"
//           },
//           "href" : "https://api.spotify.com/v1/artists/0Y6BrKJLS3zVjM9IhevDgK",
//           "id" : "0Y6BrKJLS3zVjM9IhevDgK",
//           "name" : "Hircine",
//           "type" : "artist",
//           "uri" : "spotify:artist:0Y6BrKJLS3zVjM9IhevDgK"
//         } ],
//         "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/album/1PHYJgX4c7fETvz1p0ZO2k"
//         },
//         "href" : "https://api.spotify.com/v1/albums/1PHYJgX4c7fETvz1p0ZO2k",
//         "id" : "1PHYJgX4c7fETvz1p0ZO2k",
//         "images" : [ {
//           "height" : 640,
//           "url" : "https://i.scdn.co/image/ab67616d0000b2733d1953e6896cccb2d70566d0",
//           "width" : 640
//         }, {
//           "height" : 300,
//           "url" : "https://i.scdn.co/image/ab67616d00001e023d1953e6896cccb2d70566d0",
//           "width" : 300
//         }, {
//           "height" : 64,
//           "url" : "https://i.scdn.co/image/ab67616d000048513d1953e6896cccb2d70566d0",
//           "width" : 64
//         } ],
//         "name" : "Old Kings Fall",
//         "release_date" : "2022-12-09",
//         "release_date_precision" : "day",
//         "total_tracks" : 7,
//         "type" : "album",
//         "uri" : "spotify:album:1PHYJgX4c7fETvz1p0ZO2k"
//       },
//       "artists" : [ {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/0Y6BrKJLS3zVjM9IhevDgK"
//         },
//         "href" : "https://api.spotify.com/v1/artists/0Y6BrKJLS3zVjM9IhevDgK",
//         "id" : "0Y6BrKJLS3zVjM9IhevDgK",
//         "name" : "Hircine",
//         "type" : "artist",
//         "uri" : "spotify:artist:0Y6BrKJLS3zVjM9IhevDgK"
//       } ],
//       "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//       "disc_number" : 1,
//       "duration_ms" : 211990,
//       "explicit" : false,
//       "external_ids" : {
//         "isrc" : "QZMEP2314955"
//       },
//       "external_urls" : {
//         "spotify" : "https://open.spotify.com/track/2HCrky464jW6Zi0FYFTkSG"
//       },
//       "href" : "https://api.spotify.com/v1/tracks/2HCrky464jW6Zi0FYFTkSG",
//       "id" : "2HCrky464jW6Zi0FYFTkSG",
//       "is_local" : false,
//       "name" : "Autumnal Conjuring",
//       "popularity" : 10,
//       "preview_url" : "https://p.scdn.co/mp3-preview/075146ab4d2154fade3d98ed573bb92e2d97adc3?cid=02fc8d8e87dc40a89395a26008c487ac",
//       "track_number" : 1,
//       "type" : "track",
//       "uri" : "spotify:track:2HCrky464jW6Zi0FYFTkSG"
//     }, {
//       "album" : {
//         "album_type" : "ALBUM",
//         "artists" : [ {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/1I9Hqy4QnMyVhZwRM2r41B"
//           },
//           "href" : "https://api.spotify.com/v1/artists/1I9Hqy4QnMyVhZwRM2r41B",
//           "id" : "1I9Hqy4QnMyVhZwRM2r41B",
//           "name" : "Gareth Coker",
//           "type" : "artist",
//           "uri" : "spotify:artist:1I9Hqy4QnMyVhZwRM2r41B"
//         } ],
//         "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/album/7xPc1OsC2R0siZKMlzRBIo"
//         },
//         "href" : "https://api.spotify.com/v1/albums/7xPc1OsC2R0siZKMlzRBIo",
//         "id" : "7xPc1OsC2R0siZKMlzRBIo",
//         "images" : [ {
//           "height" : 640,
//           "url" : "https://i.scdn.co/image/ab67616d0000b27371b1b5d2f76b80661d4e01c8",
//           "width" : 640
//         }, {
//           "height" : 300,
//           "url" : "https://i.scdn.co/image/ab67616d00001e0271b1b5d2f76b80661d4e01c8",
//           "width" : 300
//         }, {
//           "height" : 64,
//           "url" : "https://i.scdn.co/image/ab67616d0000485171b1b5d2f76b80661d4e01c8",
//           "width" : 64
//         } ],
//         "name" : "Ori and the Blind Forest (Original Soundtrack)",
//         "release_date" : "2015-03-10",
//         "release_date_precision" : "day",
//         "total_tracks" : 32,
//         "type" : "album",
//         "uri" : "spotify:album:7xPc1OsC2R0siZKMlzRBIo"
//       },
//       "artists" : [ {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/1I9Hqy4QnMyVhZwRM2r41B"
//         },
//         "href" : "https://api.spotify.com/v1/artists/1I9Hqy4QnMyVhZwRM2r41B",
//         "id" : "1I9Hqy4QnMyVhZwRM2r41B",
//         "name" : "Gareth Coker",
//         "type" : "artist",
//         "uri" : "spotify:artist:1I9Hqy4QnMyVhZwRM2r41B"
//       } ],
//       "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//       "disc_number" : 1,
//       "duration_ms" : 273998,
//       "explicit" : false,
//       "external_ids" : {
//         "isrc" : "USQY51530233"
//       },
//       "external_urls" : {
//         "spotify" : "https://open.spotify.com/track/7n858VaiZsoMspqkzfmXKA"
//       },
//       "href" : "https://api.spotify.com/v1/tracks/7n858VaiZsoMspqkzfmXKA",
//       "id" : "7n858VaiZsoMspqkzfmXKA",
//       "is_local" : false,
//       "name" : "First Steps Into Sunken Glades",
//       "popularity" : 38,
//       "preview_url" : "https://p.scdn.co/mp3-preview/5222000be350b8759a4b20c667a5affbf7483b17?cid=02fc8d8e87dc40a89395a26008c487ac",
//       "track_number" : 6,
//       "type" : "track",
//       "uri" : "spotify:track:7n858VaiZsoMspqkzfmXKA"
//     }, {
//       "album" : {
//         "album_type" : "ALBUM",
//         "artists" : [ {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/6wrcXTfXvKpP1HMpox9612"
//           },
//           "href" : "https://api.spotify.com/v1/artists/6wrcXTfXvKpP1HMpox9612",
//           "id" : "6wrcXTfXvKpP1HMpox9612",
//           "name" : "Fief",
//           "type" : "artist",
//           "uri" : "spotify:artist:6wrcXTfXvKpP1HMpox9612"
//         } ],
//         "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SK", "ES", "SE", "CH", "TR", "UY", "US", "GB", "AD", "LI", "MC", "JP", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PR", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TT", "VU", "AZ", "BI", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "MR", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/album/6l9MzqaxA1EYZMuSFbLnHW"
//         },
//         "href" : "https://api.spotify.com/v1/albums/6l9MzqaxA1EYZMuSFbLnHW",
//         "id" : "6l9MzqaxA1EYZMuSFbLnHW",
//         "images" : [ {
//           "height" : 640,
//           "url" : "https://i.scdn.co/image/ab67616d0000b273e36e1883502d4caba90cc657",
//           "width" : 640
//         }, {
//           "height" : 300,
//           "url" : "https://i.scdn.co/image/ab67616d00001e02e36e1883502d4caba90cc657",
//           "width" : 300
//         }, {
//           "height" : 64,
//           "url" : "https://i.scdn.co/image/ab67616d00004851e36e1883502d4caba90cc657",
//           "width" : 64
//         } ],
//         "name" : "II (Reissue Version)",
//         "release_date" : "2016-12-01",
//         "release_date_precision" : "day",
//         "total_tracks" : 8,
//         "type" : "album",
//         "uri" : "spotify:album:6l9MzqaxA1EYZMuSFbLnHW"
//       },
//       "artists" : [ {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/6wrcXTfXvKpP1HMpox9612"
//         },
//         "href" : "https://api.spotify.com/v1/artists/6wrcXTfXvKpP1HMpox9612",
//         "id" : "6wrcXTfXvKpP1HMpox9612",
//         "name" : "Fief",
//         "type" : "artist",
//         "uri" : "spotify:artist:6wrcXTfXvKpP1HMpox9612"
//       } ],
//       "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SK", "ES", "SE", "CH", "TR", "UY", "US", "GB", "AD", "LI", "MC", "JP", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PR", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TT", "VU", "AZ", "BI", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "MR", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//       "disc_number" : 1,
//       "duration_ms" : 230839,
//       "explicit" : false,
//       "external_ids" : {
//         "isrc" : "USA2P2363832"
//       },
//       "external_urls" : {
//         "spotify" : "https://open.spotify.com/track/4KXIOg7Cw4ByykZ5HRkPEb"
//       },
//       "href" : "https://api.spotify.com/v1/tracks/4KXIOg7Cw4ByykZ5HRkPEb",
//       "id" : "4KXIOg7Cw4ByykZ5HRkPEb",
//       "is_local" : false,
//       "name" : "Dawnlight Warms the Castle Stone",
//       "popularity" : 20,
//       "preview_url" : "https://p.scdn.co/mp3-preview/d2bbbacfb3b337bc542f48223f3ccd7558e6cecc?cid=02fc8d8e87dc40a89395a26008c487ac",
//       "track_number" : 1,
//       "type" : "track",
//       "uri" : "spotify:track:4KXIOg7Cw4ByykZ5HRkPEb"
//     }, {
//       "album" : {
//         "album_type" : "ALBUM",
//         "artists" : [ {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/7Fl4F5eJRtPMEl3jTYMUQt"
//           },
//           "href" : "https://api.spotify.com/v1/artists/7Fl4F5eJRtPMEl3jTYMUQt",
//           "id" : "7Fl4F5eJRtPMEl3jTYMUQt",
//           "name" : "Borislav Slavov",
//           "type" : "artist",
//           "uri" : "spotify:artist:7Fl4F5eJRtPMEl3jTYMUQt"
//         } ],
//         "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/album/075yunM0zgzQvPk2oqSLaN"
//         },
//         "href" : "https://api.spotify.com/v1/albums/075yunM0zgzQvPk2oqSLaN",
//         "id" : "075yunM0zgzQvPk2oqSLaN",
//         "images" : [ {
//           "height" : 640,
//           "url" : "https://i.scdn.co/image/ab67616d0000b2730e5f461a3d8ff89d73bb5986",
//           "width" : 640
//         }, {
//           "height" : 300,
//           "url" : "https://i.scdn.co/image/ab67616d00001e020e5f461a3d8ff89d73bb5986",
//           "width" : 300
//         }, {
//           "height" : 64,
//           "url" : "https://i.scdn.co/image/ab67616d000048510e5f461a3d8ff89d73bb5986",
//           "width" : 64
//         } ],
//         "name" : "Divinity: Original Sin 2 (Original Soundtrack)",
//         "release_date" : "2018-03-23",
//         "release_date_precision" : "day",
//         "total_tracks" : 42,
//         "type" : "album",
//         "uri" : "spotify:album:075yunM0zgzQvPk2oqSLaN"
//       },
//       "artists" : [ {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/7Fl4F5eJRtPMEl3jTYMUQt"
//         },
//         "href" : "https://api.spotify.com/v1/artists/7Fl4F5eJRtPMEl3jTYMUQt",
//         "id" : "7Fl4F5eJRtPMEl3jTYMUQt",
//         "name" : "Borislav Slavov",
//         "type" : "artist",
//         "uri" : "spotify:artist:7Fl4F5eJRtPMEl3jTYMUQt"
//       } ],
//       "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//       "disc_number" : 1,
//       "duration_ms" : 277200,
//       "explicit" : false,
//       "external_ids" : {
//         "isrc" : "FR10S1877308"
//       },
//       "external_urls" : {
//         "spotify" : "https://open.spotify.com/track/0PgXxOJyPnTvcUaZjtcfUg"
//       },
//       "href" : "https://api.spotify.com/v1/tracks/0PgXxOJyPnTvcUaZjtcfUg",
//       "id" : "0PgXxOJyPnTvcUaZjtcfUg",
//       "is_local" : false,
//       "name" : "A Tear in the Veil",
//       "popularity" : 31,
//       "preview_url" : "https://p.scdn.co/mp3-preview/2a831069c0caf06fc0894b9906efc0761850cb1c?cid=02fc8d8e87dc40a89395a26008c487ac",
//       "track_number" : 25,
//       "type" : "track",
//       "uri" : "spotify:track:0PgXxOJyPnTvcUaZjtcfUg"
//     }, {
//       "album" : {
//         "album_type" : "SINGLE",
//         "artists" : [ {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/4NRQBSmWmKRsqDbNdGeSbb"
//           },
//           "href" : "https://api.spotify.com/v1/artists/4NRQBSmWmKRsqDbNdGeSbb",
//           "id" : "4NRQBSmWmKRsqDbNdGeSbb",
//           "name" : "Paths of the Eternal",
//           "type" : "artist",
//           "uri" : "spotify:artist:4NRQBSmWmKRsqDbNdGeSbb"
//         } ],
//         "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/album/6U3zRbjw7SWWwJx3MsAuFY"
//         },
//         "href" : "https://api.spotify.com/v1/albums/6U3zRbjw7SWWwJx3MsAuFY",
//         "id" : "6U3zRbjw7SWWwJx3MsAuFY",
//         "images" : [ {
//           "height" : 640,
//           "url" : "https://i.scdn.co/image/ab67616d0000b2735193899383223274807145b4",
//           "width" : 640
//         }, {
//           "height" : 300,
//           "url" : "https://i.scdn.co/image/ab67616d00001e025193899383223274807145b4",
//           "width" : 300
//         }, {
//           "height" : 64,
//           "url" : "https://i.scdn.co/image/ab67616d000048515193899383223274807145b4",
//           "width" : 64
//         } ],
//         "name" : "Paths of the Eternal - Demo",
//         "release_date" : "2019-06-12",
//         "release_date_precision" : "day",
//         "total_tracks" : 6,
//         "type" : "album",
//         "uri" : "spotify:album:6U3zRbjw7SWWwJx3MsAuFY"
//       },
//       "artists" : [ {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/4NRQBSmWmKRsqDbNdGeSbb"
//         },
//         "href" : "https://api.spotify.com/v1/artists/4NRQBSmWmKRsqDbNdGeSbb",
//         "id" : "4NRQBSmWmKRsqDbNdGeSbb",
//         "name" : "Paths of the Eternal",
//         "type" : "artist",
//         "uri" : "spotify:artist:4NRQBSmWmKRsqDbNdGeSbb"
//       } ],
//       "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//       "disc_number" : 1,
//       "duration_ms" : 260433,
//       "explicit" : false,
//       "external_ids" : {
//         "isrc" : "GBSMU6737932"
//       },
//       "external_urls" : {
//         "spotify" : "https://open.spotify.com/track/6EPEYjoFpEKsMcx4Danmrh"
//       },
//       "href" : "https://api.spotify.com/v1/tracks/6EPEYjoFpEKsMcx4Danmrh",
//       "id" : "6EPEYjoFpEKsMcx4Danmrh",
//       "is_local" : false,
//       "name" : "Figures in the Glass",
//       "popularity" : 17,
//       "preview_url" : "https://p.scdn.co/mp3-preview/c1b43dc74a400bfb93a3af57771c30b2a0e540f7?cid=02fc8d8e87dc40a89395a26008c487ac",
//       "track_number" : 6,
//       "type" : "track",
//       "uri" : "spotify:track:6EPEYjoFpEKsMcx4Danmrh"
//     }, {
//       "album" : {
//         "album_type" : "SINGLE",
//         "artists" : [ {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/6z2KwGV9NPxZOwdQNOWTkT"
//           },
//           "href" : "https://api.spotify.com/v1/artists/6z2KwGV9NPxZOwdQNOWTkT",
//           "id" : "6z2KwGV9NPxZOwdQNOWTkT",
//           "name" : "The Herbalists",
//           "type" : "artist",
//           "uri" : "spotify:artist:6z2KwGV9NPxZOwdQNOWTkT"
//         } ],
//         "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/album/5bRH4Nn4b4ZQZ6SmzDGroe"
//         },
//         "href" : "https://api.spotify.com/v1/albums/5bRH4Nn4b4ZQZ6SmzDGroe",
//         "id" : "5bRH4Nn4b4ZQZ6SmzDGroe",
//         "images" : [ {
//           "height" : 640,
//           "url" : "https://i.scdn.co/image/ab67616d0000b273826186e67038a7ee75704e47",
//           "width" : 640
//         }, {
//           "height" : 300,
//           "url" : "https://i.scdn.co/image/ab67616d00001e02826186e67038a7ee75704e47",
//           "width" : 300
//         }, {
//           "height" : 64,
//           "url" : "https://i.scdn.co/image/ab67616d00004851826186e67038a7ee75704e47",
//           "width" : 64
//         } ],
//         "name" : "An Unexpected Forest Shrine",
//         "release_date" : "2018-03-06",
//         "release_date_precision" : "day",
//         "total_tracks" : 6,
//         "type" : "album",
//         "uri" : "spotify:album:5bRH4Nn4b4ZQZ6SmzDGroe"
//       },
//       "artists" : [ {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/6z2KwGV9NPxZOwdQNOWTkT"
//         },
//         "href" : "https://api.spotify.com/v1/artists/6z2KwGV9NPxZOwdQNOWTkT",
//         "id" : "6z2KwGV9NPxZOwdQNOWTkT",
//         "name" : "The Herbalists",
//         "type" : "artist",
//         "uri" : "spotify:artist:6z2KwGV9NPxZOwdQNOWTkT"
//       } ],
//       "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//       "disc_number" : 1,
//       "duration_ms" : 153845,
//       "explicit" : false,
//       "external_ids" : {
//         "isrc" : "GBSMU7429303"
//       },
//       "external_urls" : {
//         "spotify" : "https://open.spotify.com/track/4t6zQmpd1kMQWHAb9k90or"
//       },
//       "href" : "https://api.spotify.com/v1/tracks/4t6zQmpd1kMQWHAb9k90or",
//       "id" : "4t6zQmpd1kMQWHAb9k90or",
//       "is_local" : false,
//       "name" : "They Let Us Leave the Shrine Mostly Unharmed",
//       "popularity" : 16,
//       "preview_url" : "https://p.scdn.co/mp3-preview/366f00409850149c32b6d9174ab62b13c7331820?cid=02fc8d8e87dc40a89395a26008c487ac",
//       "track_number" : 5,
//       "type" : "track",
//       "uri" : "spotify:track:4t6zQmpd1kMQWHAb9k90or"
//     }, {
//       "album" : {
//         "album_type" : "ALBUM",
//         "artists" : [ {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/0WgwTXh66Tz9hSU7LjZsww"
//           },
//           "href" : "https://api.spotify.com/v1/artists/0WgwTXh66Tz9hSU7LjZsww",
//           "id" : "0WgwTXh66Tz9hSU7LjZsww",
//           "name" : "Brad Derrick",
//           "type" : "artist",
//           "uri" : "spotify:artist:0WgwTXh66Tz9hSU7LjZsww"
//         } ],
//         "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CG", "TJ", "VE", "ET" ],
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/album/3CDobpkPE61sifIMbxvSN7"
//         },
//         "href" : "https://api.spotify.com/v1/albums/3CDobpkPE61sifIMbxvSN7",
//         "id" : "3CDobpkPE61sifIMbxvSN7",
//         "images" : [ {
//           "height" : 640,
//           "url" : "https://i.scdn.co/image/ab67616d0000b273594c70fe42a9407228632008",
//           "width" : 640
//         }, {
//           "height" : 300,
//           "url" : "https://i.scdn.co/image/ab67616d00001e02594c70fe42a9407228632008",
//           "width" : 300
//         }, {
//           "height" : 64,
//           "url" : "https://i.scdn.co/image/ab67616d00004851594c70fe42a9407228632008",
//           "width" : 64
//         } ],
//         "name" : "The Elder Scrolls Online: Music of Tamriel, Vol. 1 (Original Game Soundtrack)",
//         "release_date" : "2016-02-12",
//         "release_date_precision" : "day",
//         "total_tracks" : 14,
//         "type" : "album",
//         "uri" : "spotify:album:3CDobpkPE61sifIMbxvSN7"
//       },
//       "artists" : [ {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/0WgwTXh66Tz9hSU7LjZsww"
//         },
//         "href" : "https://api.spotify.com/v1/artists/0WgwTXh66Tz9hSU7LjZsww",
//         "id" : "0WgwTXh66Tz9hSU7LjZsww",
//         "name" : "Brad Derrick",
//         "type" : "artist",
//         "uri" : "spotify:artist:0WgwTXh66Tz9hSU7LjZsww"
//       }, {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/49WCE2KzOvQu0wHsRcwaah"
//         },
//         "href" : "https://api.spotify.com/v1/artists/49WCE2KzOvQu0wHsRcwaah",
//         "id" : "49WCE2KzOvQu0wHsRcwaah",
//         "name" : "Rik Schaffer",
//         "type" : "artist",
//         "uri" : "spotify:artist:49WCE2KzOvQu0wHsRcwaah"
//       } ],
//       "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CG", "TJ", "VE", "ET" ],
//       "disc_number" : 1,
//       "duration_ms" : 428814,
//       "explicit" : false,
//       "external_ids" : {
//         "isrc" : "QMTH31600014"
//       },
//       "external_urls" : {
//         "spotify" : "https://open.spotify.com/track/6mGzxaHxmK8hSQJn1AmMPF"
//       },
//       "href" : "https://api.spotify.com/v1/tracks/6mGzxaHxmK8hSQJn1AmMPF",
//       "id" : "6mGzxaHxmK8hSQJn1AmMPF",
//       "is_local" : false,
//       "name" : "Recollection of Wars Long Lost",
//       "popularity" : 37,
//       "preview_url" : "https://p.scdn.co/mp3-preview/ae1da8d6fc840a841954ab08ea20c3fc825edfe4?cid=02fc8d8e87dc40a89395a26008c487ac",
//       "track_number" : 14,
//       "type" : "track",
//       "uri" : "spotify:track:6mGzxaHxmK8hSQJn1AmMPF"
//     }, {
//       "album" : {
//         "album_type" : "ALBUM",
//         "artists" : [ {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/7FzXqfhbeFzALmcyi1j90U"
//           },
//           "href" : "https://api.spotify.com/v1/artists/7FzXqfhbeFzALmcyi1j90U",
//           "id" : "7FzXqfhbeFzALmcyi1j90U",
//           "name" : "Joris de Man",
//           "type" : "artist",
//           "uri" : "spotify:artist:7FzXqfhbeFzALmcyi1j90U"
//         }, {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/633wBWQrbgm4Tugw7MmsgA"
//           },
//           "href" : "https://api.spotify.com/v1/artists/633wBWQrbgm4Tugw7MmsgA",
//           "id" : "633wBWQrbgm4Tugw7MmsgA",
//           "name" : "The Flight",
//           "type" : "artist",
//           "uri" : "spotify:artist:633wBWQrbgm4Tugw7MmsgA"
//         }, {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/5PcieKHIXvRQ73ooTBA7eh"
//           },
//           "href" : "https://api.spotify.com/v1/artists/5PcieKHIXvRQ73ooTBA7eh",
//           "id" : "5PcieKHIXvRQ73ooTBA7eh",
//           "name" : "Niels van der Leest",
//           "type" : "artist",
//           "uri" : "spotify:artist:5PcieKHIXvRQ73ooTBA7eh"
//         } ],
//         "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/album/1tnJU98uHAWkkAsRekqtTe"
//         },
//         "href" : "https://api.spotify.com/v1/albums/1tnJU98uHAWkkAsRekqtTe",
//         "id" : "1tnJU98uHAWkkAsRekqtTe",
//         "images" : [ {
//           "height" : 640,
//           "url" : "https://i.scdn.co/image/ab67616d0000b2732523b2f62d91b1c9a82a0645",
//           "width" : 640
//         }, {
//           "height" : 300,
//           "url" : "https://i.scdn.co/image/ab67616d00001e022523b2f62d91b1c9a82a0645",
//           "width" : 300
//         }, {
//           "height" : 64,
//           "url" : "https://i.scdn.co/image/ab67616d000048512523b2f62d91b1c9a82a0645",
//           "width" : 64
//         } ],
//         "name" : "Horizon Zero Dawn (Original Soundtrack)",
//         "release_date" : "2017",
//         "release_date_precision" : "year",
//         "total_tracks" : 80,
//         "type" : "album",
//         "uri" : "spotify:album:1tnJU98uHAWkkAsRekqtTe"
//       },
//       "artists" : [ {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/633wBWQrbgm4Tugw7MmsgA"
//         },
//         "href" : "https://api.spotify.com/v1/artists/633wBWQrbgm4Tugw7MmsgA",
//         "id" : "633wBWQrbgm4Tugw7MmsgA",
//         "name" : "The Flight",
//         "type" : "artist",
//         "uri" : "spotify:artist:633wBWQrbgm4Tugw7MmsgA"
//       } ],
//       "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//       "disc_number" : 1,
//       "duration_ms" : 142816,
//       "explicit" : false,
//       "external_ids" : {
//         "isrc" : "GB9TP1501595"
//       },
//       "external_urls" : {
//         "spotify" : "https://open.spotify.com/track/5orWtYpFEkW5nAoEjYvDkw"
//       },
//       "href" : "https://api.spotify.com/v1/tracks/5orWtYpFEkW5nAoEjYvDkw",
//       "id" : "5orWtYpFEkW5nAoEjYvDkw",
//       "is_local" : false,
//       "name" : "Years of Training - Part 1 - Motherland",
//       "popularity" : 38,
//       "preview_url" : "https://p.scdn.co/mp3-preview/b2b9145442168a4bb3dfc70b5ec680e1f9e2e841?cid=02fc8d8e87dc40a89395a26008c487ac",
//       "track_number" : 9,
//       "type" : "track",
//       "uri" : "spotify:track:5orWtYpFEkW5nAoEjYvDkw"
//     }, {
//       "album" : {
//         "album_type" : "ALBUM",
//         "artists" : [ {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/30SiUhbJL8LZLbO1FfVR22"
//           },
//           "href" : "https://api.spotify.com/v1/artists/30SiUhbJL8LZLbO1FfVR22",
//           "id" : "30SiUhbJL8LZLbO1FfVR22",
//           "name" : "Old Sorcery",
//           "type" : "artist",
//           "uri" : "spotify:artist:30SiUhbJL8LZLbO1FfVR22"
//         } ],
//         "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/album/26SEv2UKQeriTEJc4svwYL"
//         },
//         "href" : "https://api.spotify.com/v1/albums/26SEv2UKQeriTEJc4svwYL",
//         "id" : "26SEv2UKQeriTEJc4svwYL",
//         "images" : [ {
//           "height" : 640,
//           "url" : "https://i.scdn.co/image/ab67616d0000b27310e63866461c97b378fb83a8",
//           "width" : 640
//         }, {
//           "height" : 300,
//           "url" : "https://i.scdn.co/image/ab67616d00001e0210e63866461c97b378fb83a8",
//           "width" : 300
//         }, {
//           "height" : 64,
//           "url" : "https://i.scdn.co/image/ab67616d0000485110e63866461c97b378fb83a8",
//           "width" : 64
//         } ],
//         "name" : "Realms of Magickal Sorrow",
//         "release_date" : "2018-04-09",
//         "release_date_precision" : "day",
//         "total_tracks" : 5,
//         "type" : "album",
//         "uri" : "spotify:album:26SEv2UKQeriTEJc4svwYL"
//       },
//       "artists" : [ {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/30SiUhbJL8LZLbO1FfVR22"
//         },
//         "href" : "https://api.spotify.com/v1/artists/30SiUhbJL8LZLbO1FfVR22",
//         "id" : "30SiUhbJL8LZLbO1FfVR22",
//         "name" : "Old Sorcery",
//         "type" : "artist",
//         "uri" : "spotify:artist:30SiUhbJL8LZLbO1FfVR22"
//       } ],
//       "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//       "disc_number" : 1,
//       "duration_ms" : 266019,
//       "explicit" : false,
//       "external_ids" : {
//         "isrc" : "GB-SMU-49-66743"
//       },
//       "external_urls" : {
//         "spotify" : "https://open.spotify.com/track/4dXLbssU9REn9akceTUSBr"
//       },
//       "href" : "https://api.spotify.com/v1/tracks/4dXLbssU9REn9akceTUSBr",
//       "id" : "4dXLbssU9REn9akceTUSBr",
//       "is_local" : false,
//       "name" : "Vaikerruksen Portti",
//       "popularity" : 27,
//       "preview_url" : "https://p.scdn.co/mp3-preview/b4c7f513b13c59c397a7a98b9c5d71dcba57e627?cid=02fc8d8e87dc40a89395a26008c487ac",
//       "track_number" : 2,
//       "type" : "track",
//       "uri" : "spotify:track:4dXLbssU9REn9akceTUSBr"
//     }, {
//       "album" : {
//         "album_type" : "ALBUM",
//         "artists" : [ {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/0JnNzCUsHuDcUcBatOzuGP"
//           },
//           "href" : "https://api.spotify.com/v1/artists/0JnNzCUsHuDcUcBatOzuGP",
//           "id" : "0JnNzCUsHuDcUcBatOzuGP",
//           "name" : "Sonya Belousova",
//           "type" : "artist",
//           "uri" : "spotify:artist:0JnNzCUsHuDcUcBatOzuGP"
//         }, {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/2GGcFMw7PABKRpAS0lpYX6"
//           },
//           "href" : "https://api.spotify.com/v1/artists/2GGcFMw7PABKRpAS0lpYX6",
//           "id" : "2GGcFMw7PABKRpAS0lpYX6",
//           "name" : "Giona Ostinelli",
//           "type" : "artist",
//           "uri" : "spotify:artist:2GGcFMw7PABKRpAS0lpYX6"
//         } ],
//         "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/album/5tdmyKWNxDlCvYCdJQKGoS"
//         },
//         "href" : "https://api.spotify.com/v1/albums/5tdmyKWNxDlCvYCdJQKGoS",
//         "id" : "5tdmyKWNxDlCvYCdJQKGoS",
//         "images" : [ {
//           "height" : 640,
//           "url" : "https://i.scdn.co/image/ab67616d0000b2733e7e7a06ef941871a2f51135",
//           "width" : 640
//         }, {
//           "height" : 300,
//           "url" : "https://i.scdn.co/image/ab67616d00001e023e7e7a06ef941871a2f51135",
//           "width" : 300
//         }, {
//           "height" : 64,
//           "url" : "https://i.scdn.co/image/ab67616d000048513e7e7a06ef941871a2f51135",
//           "width" : 64
//         } ],
//         "name" : "The Witcher (Music from the Netflix Original Series)",
//         "release_date" : "2020-01-24",
//         "release_date_precision" : "day",
//         "total_tracks" : 55,
//         "type" : "album",
//         "uri" : "spotify:album:5tdmyKWNxDlCvYCdJQKGoS"
//       },
//       "artists" : [ {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/0JnNzCUsHuDcUcBatOzuGP"
//         },
//         "href" : "https://api.spotify.com/v1/artists/0JnNzCUsHuDcUcBatOzuGP",
//         "id" : "0JnNzCUsHuDcUcBatOzuGP",
//         "name" : "Sonya Belousova",
//         "type" : "artist",
//         "uri" : "spotify:artist:0JnNzCUsHuDcUcBatOzuGP"
//       }, {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/2GGcFMw7PABKRpAS0lpYX6"
//         },
//         "href" : "https://api.spotify.com/v1/artists/2GGcFMw7PABKRpAS0lpYX6",
//         "id" : "2GGcFMw7PABKRpAS0lpYX6",
//         "name" : "Giona Ostinelli",
//         "type" : "artist",
//         "uri" : "spotify:artist:2GGcFMw7PABKRpAS0lpYX6"
//       } ],
//       "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//       "disc_number" : 1,
//       "duration_ms" : 168202,
//       "explicit" : false,
//       "external_ids" : {
//         "isrc" : "USQX92000236"
//       },
//       "external_urls" : {
//         "spotify" : "https://open.spotify.com/track/41yC7uY7DcptdwNx1afHtv"
//       },
//       "href" : "https://api.spotify.com/v1/tracks/41yC7uY7DcptdwNx1afHtv",
//       "id" : "41yC7uY7DcptdwNx1afHtv",
//       "is_local" : false,
//       "name" : "A Gift for the Princess",
//       "popularity" : 29,
//       "preview_url" : "https://p.scdn.co/mp3-preview/d23c628c921f984760c81718046cfd8462dd5d5e?cid=02fc8d8e87dc40a89395a26008c487ac",
//       "track_number" : 40,
//       "type" : "track",
//       "uri" : "spotify:track:41yC7uY7DcptdwNx1afHtv"
//     }, {
//       "album" : {
//         "album_type" : "ALBUM",
//         "artists" : [ {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/6jYG9nOTjxTGqj9RZlef1d"
//           },
//           "href" : "https://api.spotify.com/v1/artists/6jYG9nOTjxTGqj9RZlef1d",
//           "id" : "6jYG9nOTjxTGqj9RZlef1d",
//           "name" : "Monastery",
//           "type" : "artist",
//           "uri" : "spotify:artist:6jYG9nOTjxTGqj9RZlef1d"
//         } ],
//         "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/album/4RneNKY486PxGeiOzzv4fh"
//         },
//         "href" : "https://api.spotify.com/v1/albums/4RneNKY486PxGeiOzzv4fh",
//         "id" : "4RneNKY486PxGeiOzzv4fh",
//         "images" : [ {
//           "height" : 640,
//           "url" : "https://i.scdn.co/image/ab67616d0000b2735e5c8d8ef4fcecb99bfc0876",
//           "width" : 640
//         }, {
//           "height" : 300,
//           "url" : "https://i.scdn.co/image/ab67616d00001e025e5c8d8ef4fcecb99bfc0876",
//           "width" : 300
//         }, {
//           "height" : 64,
//           "url" : "https://i.scdn.co/image/ab67616d000048515e5c8d8ef4fcecb99bfc0876",
//           "width" : 64
//         } ],
//         "name" : "The Garden of Abandon (Part I: The Summer Queen & Part II: the Winter King)",
//         "release_date" : "2019-03-15",
//         "release_date_precision" : "day",
//         "total_tracks" : 9,
//         "type" : "album",
//         "uri" : "spotify:album:4RneNKY486PxGeiOzzv4fh"
//       },
//       "artists" : [ {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/6jYG9nOTjxTGqj9RZlef1d"
//         },
//         "href" : "https://api.spotify.com/v1/artists/6jYG9nOTjxTGqj9RZlef1d",
//         "id" : "6jYG9nOTjxTGqj9RZlef1d",
//         "name" : "Monastery",
//         "type" : "artist",
//         "uri" : "spotify:artist:6jYG9nOTjxTGqj9RZlef1d"
//       } ],
//       "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//       "disc_number" : 1,
//       "duration_ms" : 425454,
//       "explicit" : false,
//       "external_ids" : {
//         "isrc" : "QZDA81971311"
//       },
//       "external_urls" : {
//         "spotify" : "https://open.spotify.com/track/4AZu2pkvOQhUPLT58khoGn"
//       },
//       "href" : "https://api.spotify.com/v1/tracks/4AZu2pkvOQhUPLT58khoGn",
//       "id" : "4AZu2pkvOQhUPLT58khoGn",
//       "is_local" : false,
//       "name" : "Part I: An Ivy Gateway",
//       "popularity" : 8,
//       "preview_url" : "https://p.scdn.co/mp3-preview/c6634ed37d6990ccb329369c48507287f43f13f7?cid=02fc8d8e87dc40a89395a26008c487ac",
//       "track_number" : 4,
//       "type" : "track",
//       "uri" : "spotify:track:4AZu2pkvOQhUPLT58khoGn"
//     }, {
//       "album" : {
//         "album_type" : "COMPILATION",
//         "artists" : [ {
//           "external_urls" : {
//             "spotify" : "https://open.spotify.com/artist/6UJ3pPsN7xzsz0Cneucy59"
//           },
//           "href" : "https://api.spotify.com/v1/artists/6UJ3pPsN7xzsz0Cneucy59",
//           "id" : "6UJ3pPsN7xzsz0Cneucy59",
//           "name" : "Blizzard Entertainment",
//           "type" : "artist",
//           "uri" : "spotify:artist:6UJ3pPsN7xzsz0Cneucy59"
//         } ],
//         "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/album/26RztoSsSTQCNqxf6sNWGz"
//         },
//         "href" : "https://api.spotify.com/v1/albums/26RztoSsSTQCNqxf6sNWGz",
//         "id" : "26RztoSsSTQCNqxf6sNWGz",
//         "images" : [ {
//           "height" : 640,
//           "url" : "https://i.scdn.co/image/ab67616d0000b273ea39f81059517a3e837850f1",
//           "width" : 640
//         }, {
//           "height" : 300,
//           "url" : "https://i.scdn.co/image/ab67616d00001e02ea39f81059517a3e837850f1",
//           "width" : 300
//         }, {
//           "height" : 64,
//           "url" : "https://i.scdn.co/image/ab67616d00004851ea39f81059517a3e837850f1",
//           "width" : 64
//         } ],
//         "name" : "World of Warcraft: Cataclysm (Original Game Soundtrack)",
//         "release_date" : "2010-12-07",
//         "release_date_precision" : "day",
//         "total_tracks" : 17,
//         "type" : "album",
//         "uri" : "spotify:album:26RztoSsSTQCNqxf6sNWGz"
//       },
//       "artists" : [ {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/2aiwPgMCDLC1sukvKh248Y"
//         },
//         "href" : "https://api.spotify.com/v1/artists/2aiwPgMCDLC1sukvKh248Y",
//         "id" : "2aiwPgMCDLC1sukvKh248Y",
//         "name" : "Derek Duke",
//         "type" : "artist",
//         "uri" : "spotify:artist:2aiwPgMCDLC1sukvKh248Y"
//       }, {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/21Uejbf0dmBe3tEOUhWWt0"
//         },
//         "href" : "https://api.spotify.com/v1/artists/21Uejbf0dmBe3tEOUhWWt0",
//         "id" : "21Uejbf0dmBe3tEOUhWWt0",
//         "name" : "David Arkenstone",
//         "type" : "artist",
//         "uri" : "spotify:artist:21Uejbf0dmBe3tEOUhWWt0"
//       } ],
//       "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "BY", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK" ],
//       "disc_number" : 1,
//       "duration_ms" : 221609,
//       "explicit" : false,
//       "external_ids" : {
//         "isrc" : "USQ771700004"
//       },
//       "external_urls" : {
//         "spotify" : "https://open.spotify.com/track/4B0pbNlxQ3pWuw4p9xB0k4"
//       },
//       "href" : "https://api.spotify.com/v1/tracks/4B0pbNlxQ3pWuw4p9xB0k4",
//       "id" : "4B0pbNlxQ3pWuw4p9xB0k4",
//       "is_local" : false,
//       "name" : "Depths of Vashj'ir",
//       "popularity" : 18,
//       "preview_url" : "https://p.scdn.co/mp3-preview/54ce15afb93cb5a176566ab836191f7101921f48?cid=02fc8d8e87dc40a89395a26008c487ac",
//       "track_number" : 4,
//       "type" : "track",
//       "uri" : "spotify:track:4B0pbNlxQ3pWuw4p9xB0k4"
//     } ],
//     "seeds" : [ {
//       "initialPoolSize" : 500,
//       "afterFilteringSize" : 417,
//       "afterRelinkingSize" : 417,
//       "id" : "45mG9ywi5sbbxjA2Rdv95L",
//       "type" : "TRACK",
//       "href" : "https://api.spotify.com/v1/tracks/45mG9ywi5sbbxjA2Rdv95L"
//     }, {
//       "initialPoolSize" : 500,
//       "afterFilteringSize" : 417,
//       "afterRelinkingSize" : 417,
//       "id" : "5bhZCxZo9ejcqInKNvbL73",
//       "type" : "TRACK",
//       "href" : "https://api.spotify.com/v1/tracks/5bhZCxZo9ejcqInKNvbL73"
//     }, {
//       "initialPoolSize" : 501,
//       "afterFilteringSize" : 417,
//       "afterRelinkingSize" : 417,
//       "id" : "0OAFbTeLkdqUO6t9H2ybGx",
//       "type" : "TRACK",
//       "href" : "https://api.spotify.com/v1/tracks/0OAFbTeLkdqUO6t9H2ybGx"
//     } ]
//   }


function PlaylistPanel({playlist}) {
    console.log("PLAYLIST IN PLAYLIST", playlist)
    const onboarding = true
    const profile = useContext(UserContext).profile
    const appToken = useContext(AuthContext).appToken
    const spotifyAccessToken = useContext(AuthContext).spotifyAccessToken
    // const [playlist, setPlaylist] = useState()

    // const playlist = useContext(UserContext).playlist
    const setActive = useContext(UserContext).setActive
    // const setPlaylistID = useContext(UserContext).setPlaylistID
    // const [playlist, setActive, owned] = usePlaylist(playlistID, appToken, spotifyAccessToken)
    const [owned, setOwned] = useState(true) 
    const [search, setTokens, searchResults] = useSearch()


    function checkOwnedPlaylist(profileID, playlistID) {
      if(profileID === playlistID) {
        return true
      }
      return false

    }

    
    useEffect(() => {
        if(onboarding === true) {
          // TODO
        }
        // console.log("PLAYLIST", owned)
        if(appToken && spotifyAccessToken) {
          setTokens({
            appToken: appToken,
            spotifyAccessToken: spotifyAccessToken
          })
          // setPlaylistID(playlistID)

        }
    }, [])

    useEffect(() => {
      if(playlist) {
        console.log("PLAYLIST", playlist)
        // console.log("OWNED", owned)
      }
    }, [playlist])

    return(
        <section className="panel panel__playlist">
            {playlist? 
              <>
                <PlaylistHeader 
                    playlist={playlist} 
                    owned={owned ? true: false}
                    />
                    <div className="flex">
                        {owned ?
                            <div className="flex flex-col">
                                <SearchInput 
                                    search={search}
                                    />
                                <SearchDropdown 
                                    searchResults={searchResults}
                                />
                                
                            </div>
   
                            :null
                        }
                        <TrackTable 
                            tracks={playlist.tracks.items}
                            owned={owned ? true: false}
                        />
                    </div>

              </>
            :null
            }

            {/* ////////?///// MOCK PLAYLIST UNCOMMENT TO CHECK */}
            {/* <PlaylistHeader playlist={PLAYLIST}/>
            <TrackTable
                tracks={TRACKS.tracks}
            /> */}
        </section>
    )
}

// These are sub components of the main playlist panel, and include the functionality of creating a new playlist

/*
    The meat of creating a playlist, includes inputs for name, description, adding tags, and a small search bar for adding songs
*/
// function CreatePlaylistMenu({playlist}) {
//     const search = useContext(PanelFunctionContext).search
//     return(
//         <section>
//             {/* Header for metadata like in spotify */}
//             <PlaylistHeader 
//                 playlist={playlist}
//             />
//             <SearchInput search={search}/>
//             <TrackTable />

//         </section>
//     )
// }

PlaylistPanel.propTypes = {
  // playlistID: PropTypes.string.isRequired
}

export default PlaylistPanel


/**
 * 
 * An Ap playlist is an object that includes the URI to a spotify playlist, that ID is what's used to populate and controls the playlist tracktable.
 * 
 * playlist.spotifyPlaylist.items....etc
 * 
 */