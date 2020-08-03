# Client PC

Aircom 서비스의 PC Client

[Moonlight PC v2.1.0를 수정해서 사용](https://github.com/moonlight-stream/moonlight-qt/releases/tag/v2.1.0)
 
## Building

### Windows Build Requirements
* Qt 5.12.4 SDK or later
* Windows 7 or later
* [Visual Studio](https://visualstudio.microsoft.com/downloads/) 2017 (Community edition is fine)
* Select MSVC Desktop toolchain during Qt installation
* [DirectX SDK](https://www.microsoft.com/en-us/download/details.aspx?id=6812)
* [7-Zip](https://www.7-zip.org/) (only if building installers for non-development PCs)
* [WiX Toolset](http://wixtoolset.org/releases/) v3.11 or later (only if building installers for non-development PCs)

### macOS Build Requirements
* Qt 5.14 SDK or later
* macOS High Sierra (10.13) or later
* Xcode 11
* [create-dmg](https://github.com/sindresorhus/create-dmg) (only if building DMGs for use on non-development Macs)

### Linux/Unix Build Requirements
* Qt 5.9 SDK or later
* GCC or Clang
* Install your distro equivalents of: `openssl-devel qt5-devel SDL2-devel ffmpeg-devel qt5-qtquickcontrols2-devel libva-devel libvdpau-devel opus-devel pulseaudio-libs-devel alsa-lib-devel SDL2_ttf-devel`
* FFmpeg 4.0 is required to build. If your distro doesn't package FFmpeg 4.0, you can build and install it from source on http://ffmpeg.org/

### Steam Link Build Requirements
* [Steam Link SDK](https://github.com/ValveSoftware/steamlink-sdk) cloned on your build system
* STEAMLINK_SDK_PATH environment variable set to the Steam Link SDK path

### Build Setup Steps
1. Install the latest Qt SDK (and optionally, the Qt Creator IDE) from https://www.qt.io/download
    * You can install Qt via Homebrew on macOS, but you will need to use `brew install qt --with-debug` to be able to create debug builds of Moonlight.
    * You may also use your Linux distro's package manager for the Qt SDK as long as the packages are Qt 5.9 or later.
    * This step is not required for building on Steam Link, because the Steam Link SDK includes Qt 5.9.
2. Run `git submodule update --init --recursive` from within `moonlight-qt/`
3. Open the project in Qt Creator or build from qmake on the command line.
    * To build a binary for use on non-development machines, use the scripts in the `scripts` folder.
        * For Windows builds, use `scripts\generate-installers.bat`. Execute this script from the root of the repository within a Qt command prompt. Ensure WiX and 7-Zip binary directories are in your `%PATH%`.
        * For macOS builds, use `scripts/generate-dmg.sh`. Execute this script from the root of the repository and ensure Qt's `bin` folder is in your `$PATH`.
        * For Steam Link builds, run `scripts/build-steamlink-app.sh` from the root of the repository.
    * To build from the command line for development use, run `qmake moonlight-qt.pro` then `make debug` or `make release`
