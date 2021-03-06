#0.2.9 (2013-12-18)

Tizen apps can execute in-line JavaScript

Changes:
  - Allow in-line script running in Tizen apps (new config.tizen.xml)

#0.2.8 (2013-12-13)

`.gitignore` creation fixed, default project version "0.0.1"

Bugfixes:
  - `steroids:app` generator now creates `.gitignore`

Changes:
  - `steroids:app` creates `package.json` with version "0.0.1" (was "0.1.0")

#0.2.7 (2013-12-12)

Default project generated by `steroids:app` is now compatible with Steroids CLI 3.1.x, programmatic Bower runs properly

Features:
  – `skip-install` flag in `steroids:app` generator skips npm install
  - Default project is now compatible with Steroids CLI 3.1.x

Changes:
  - Removed `onerror.js` from examples using a File URL as the initial location to solve issues on Android.

Bugfixes:
  - Programmatic Bower install runs properly with colored output.

#0.2.6 (2013-11-29)

Install only npm dependencies when generating a new Steroids project with `steroids:app` generator.

Changes:
  - New projects only install npm dependencies (`bower install` is not run).

#0.2.5 (2013-11-29)

Use Bower from `node_modules` instead of requiring user to have a global Bower install.

Changes:
  - Generators run Bower from `node_modules` instead of using global Bower.

#0.2.4 (2013-11-29)

New generator `application-config` for dynamically generating application config files for a new project.

Changes:
  - `steroids:app` generator uses `steroids:application-config` internally to generate `config/application.coffee`

#0.2.3 (2013-11-29)

Fixed missing `chalk` dependency in `bb-scaffold` generator.

#0.2.2 (2013-11-29)

New generators added, instructions grammar/clarity fixes.

Features:
  - New generators added:
    - `steroids:tutorial:begin`
    - `steroids:tutorial:steroids`
    - `steroids:tutorial:controllers`
    - `steroids:ng-touchdb-resource`
    - `steroids:bb-scaffold`

#0.2.1 (2013-11-28)

Fixed new project template `package.json`'s `grunt-steroids` dependency.

#0.2.0 (2013-11-28)

New generators added.

Features:
  - New generators added:
    - `steroids:app`
    - `steroids:example:accelerometer`
    - `steroids:example:animation`
    - `steroids:example:audio`
    - `steroids:example:camera`
    - `steroids:example:compass`
    - `steroids:example:device`
    - `steroids:example:drawer`
    - `steroids:example:drumMachine`
    - `steroids:example:geolocation`
    - `steroids:example:layerStack`
    - `steroids:example:modal`
    - `steroids:example:navigationBar`
    - `steroids:example:notification`
    - `steroids:example:photoGallery`
    - `steroids:example:preload`
    - `steroids:example:s3upload`
    - `steroids:example:storage`
    - `steroids:ng-resource`
    - `steroids:ng-scaffold`
    - `steroids:ng-sql-scaffold`

#0.1.1 (2013-10-04)

Fixed crash issue caused by an outdated `yeoman-generator` dependency.

#0.1.0 (2013-10-04)

Initial version with `ng-resource` generator.
