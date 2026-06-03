#!/bin/bash
cd /Users/nickramos/ramappsolutions
exec python3 -m http.server ${PORT:-5002}
