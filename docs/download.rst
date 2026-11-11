Downloads
=========

Choose a release
----------------

The list below is loaded from the public GitHub releases for aurumOS. Stable
releases and prereleases are included; use the channel filter to narrow the
list. Each ISO link downloads directly from GitHub.

Current profile target: **|iso-name| |iso-version|** for **|architecture|**
(**|boot-modes|**; channel: **|iso-state|**).
Release files are published separately on GitHub and may not match the current
unreleased profile.

.. raw:: html

   <section class="release-browser" aria-label="aurumOS releases">
     <div class="release-controls">
       <label for="release-channel">Channel
         <select id="release-channel">
           <option value="all">All releases</option>
           <option value="stable">Stable</option>
           <option value="prerelease">Prereleases</option>
         </select>
       </label>
       <label for="release-search">Search releases
         <input id="release-search" type="search" placeholder="Version or codename" autocomplete="off">
       </label>
       <button id="release-retry" class="action-link action-secondary" type="button">Refresh</button>
     </div>
     <p id="release-status" class="release-status" role="status" aria-live="polite">Loading releases from GitHub...</p>
     <div id="release-list" class="release-list" aria-live="polite"></div>
     <noscript><p>JavaScript is required to load the release list. Visit <a href="https://github.com/Project-Elaris/aurumOS/releases">all aurumOS releases on GitHub</a>.</p></noscript>
   </section>

Direct links
------------

* `All releases on GitHub <https://github.com/Project-Elaris/aurumOS/releases>`_
* `Build and release history <https://github.com/Project-Elaris/aurumOS/actions>`_

For USB creation and first boot, follow the `first-run guide <using.html>`_.