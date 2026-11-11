Contributing
============

Bug reports and proposals
-------------------------

Use the `GitHub issue tracker <https://github.com/Project-Elaris/aurumOS/issues>`_
for bugs and feature proposals. Include reproduction steps and relevant
hardware, ISO version, firmware mode, and build or boot logs. Do not include
private keys, passwords, or other sensitive data in logs.

Changes
-------

Keep changes focused and update the documentation when behavior or build
instructions change. Package additions should have a clear purpose because
they increase image size and build time.

Before opening a pull request, check shell syntax and, when Docker is available,
build the image:

.. code-block:: sh

   bash -n installation-scripts/30-build-the-iso-the-first-time.sh
   bash -n installation-scripts/40-build-the-iso-local-again.sh
   docker build -t aurumos-iso .

For documentation changes, install ``docs/requirements.txt`` and build the
Sphinx site with warnings enabled:

.. code-block:: sh

   python -m pip install -r docs/requirements.txt
   python -m sphinx -W --keep-going -b html docs docs/_build/html