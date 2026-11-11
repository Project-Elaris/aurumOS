Configure the image
===================

Build profile
-------------

``archiso/profiledef.sh`` is the source of ISO metadata and build settings. The
Read the Docs build sources this profile directly, so the displayed release,
architecture, and boot modes follow the image configuration instead of a
separate copy maintained in the documentation.

The current profile identifies the image as **|iso-name| |iso-version|**
(channel **|iso-state|**, codename **|iso-codename|**), with volume label
``|iso-label|`` and application description ``|iso-application|``.

Notable settings include:

* ``iso_name``, ``iso_state``, ``iso_codename``, and ``iso_version`` for release
  identity. The version is derived from the UTC build month.
* ``arch``, ``buildmodes``, and ``bootmodes`` for architecture and supported
  image/boot targets. Current values: **|architecture|**,
  **|build-modes|**, and **|boot-modes|**.
* ``airootfs_image_type`` and ``airootfs_image_tool_options`` for compression.
* ``file_permissions`` for permissions applied to selected files in the live
  root filesystem.

The release workflow reads these same values for the GitHub release title,
tag, artifact name, and release notes.

Packages
--------

``archiso/packages.x86_64`` lists packages installed in the live image. Add one
package per line and keep the list focused: each additional package increases
download time and ISO size. Packages must be available from a repository
configured for the build.

Boot menus
----------

The profile selects **|boot-modes|**. Their menu titles and entries are
configured under ``archiso/syslinux/`` and
``archiso/efiboot/`` respectively. Update the matching entry files when
changing boot labels or kernel options, and keep the standard and accessibility
entries in sync. The PXE Syslinux entries are in
``archiso/syslinux/archiso_pxe-linux.cfg``. GRUB templates are also present
under ``archiso/grub/``, but GRUB is not selected by the current profile.

Package repositories
--------------------

``archiso/pacman.conf`` configures repositories used during the image build.
The profile currently includes a custom repository whose signature policy is
``Optional TrustAll``. This accepts packages without signature verification;
review the repository and its trust model before using it for a production
image.

Live filesystem
---------------

Files under ``archiso/airootfs/`` are copied into the live system at their
corresponding filesystem paths. Systemd units, network configuration, desktop
settings, and helper scripts can be adjusted there. Keep executable bits and
the permissions declared in ``profiledef.sh`` in sync with any changes.