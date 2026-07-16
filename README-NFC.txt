ROOM PAGE SETUP

Files:
- room.html
- css/room.css
- js/room.js

Put your stamp PNG here:
- images/stamp.png

The floor-map files do not need to change.

ANDROID WEB NFC
Write each organisation's stampToken into the tag as an NDEF text record.
Example:
an321-org-a

IPHONE / FALLBACK
Write a URL into the NFC tag instead:
https://YOUR-DOMAIN/room.html?room=an321&name=AN321&stamp=an321-org-a
