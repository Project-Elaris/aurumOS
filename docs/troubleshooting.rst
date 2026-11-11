Troubleshooting
===============

Docker cannot build the image
-----------------------------

Make sure Docker is running and the build is started from the repository root.
The build needs network access to Arch Linux package mirrors and the configured
custom repository. If a package cannot be found, check its name and the
repositories in ``archiso/pacman.conf``.

The ISO does not appear in ``output/``
----------------------------------------

Check that the container completed successfully and that the host ``output``
directory was mounted as shown in the build guide. Archiso failures are printed
in the container log; retry after resolving the first reported package or
profile error.

The live image does not boot
----------------------------

The profile configures BIOS Syslinux and UEFI systemd-boot. Choose a matching
firmware mode in the computer's boot menu. When reporting a failure, include
the ISO version, firmware mode, hardware model, and any visible boot errors.

Package or profile incompatibility
----------------------------------

Archiso and Arch Linux repositories are rolling. A profile that worked with
one package set may need changes after repository updates. Record the installed
Archiso version and the failing package or command when opening an issue.