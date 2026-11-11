Try aurumOS
===========

Before you begin
----------------

You need an x86_64 computer and a USB drive large enough for the ISO. Writing
the image erases the USB drive, so copy off anything you need first. The live
system is intended for testing and installation, not as a substitute for a
backup.

1. Download an ISO from the `downloads page <download.html>`_. Choose a stable
   release when available; prereleases may contain unfinished changes.
2. Write the ISO to the USB drive with an image-writing tool. Do not copy the
   ISO file onto the drive as a regular file. Double-check the selected drive
   before confirming because its contents will be erased.
3. Restart the computer and choose the USB drive from its one-time boot menu.
   Use the UEFI entry on UEFI systems or the BIOS entry on legacy systems.
4. Choose **Arch Linux install medium** from the boot menu. The system should
   start the COSMIC desktop and sign in to the live session automatically.

Explore the live session
------------------------

Connect to a network from the desktop if needed, then try the included desktop
and utilities. Changes made in the live session are temporary. To install,
launch Calamares from the application menu and follow its prompts.

Read each installer page carefully. In particular, review the target disk and
partition choices before applying them: selecting a disk for formatting can
erase its existing data. Keep a separate backup of important files.

When installation completes, restart and remove the USB drive when prompted.
If the live session does not start, see the
`troubleshooting guide <troubleshooting.html>`_.