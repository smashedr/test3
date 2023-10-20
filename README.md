[![Build](https://github.com/cssnr/link-extractor/actions/workflows/build.yaml/badge.svg)](https://github.com/cssnr/link-extractor/actions/workflows/build.yaml)
[![GitHub Release](https://img.shields.io/github/v/release/cssnr/link-extractor)](https://github.com/cssnr/link-extractor/releases/latest)
# Link Extractor

## Table of Contents

*   [Overview](#overview)
*   [Development](#development)
    -   [Chrome Setup](#chrome-setup)
    -   [Firefox Setup](#firefox-setup)

## Overview

Because a once good project **turned into bloatware**: https://github.com/az0/linkgopher

## Development

### Chrome Setup

1.  Download (or clone) the repo: [link-extractor-master.zip](https://github.com/cssnr/link-extractor/archive/refs/heads/master.zip)
1.  Unzip the archive, place the folder where it must remain and note its location for later.
1.  Open Chrome, click the `3 dots` in the top right, click `Extensions`, click `Manage Extensions`.
1.  In the top right, click `Developer Mode` then on the top left click `Load unpacked`.
1.  Navigate to the folder you extracted in step #3 then click `Select Folder`.

The addon should now be installed and running in Chrome.

### Firefox Setup

> **Note**
>
> This **does not** work on Release Firefox!
> You must use [ESR](https://www.mozilla.org/en-CA/firefox/all/#product-desktop-esr) (recommended),
> Development, or Nightly.

1.  Download (or clone) the repo: [link-extractor-master.zip](https://github.com/cssnr/link-extractor/archive/refs/heads/master.zip)
1.  Open `about:config` search for `xpinstall.signatures.required` and set to `false`.
1.  Open `about:addons` and drag the zip file to the page or choose Install from File from the Settings Wheel.

The addon should now be installed and running in Firefox.
