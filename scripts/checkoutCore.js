var spawn = require('child_process').spawn;
var fs = require('fs');

var REPOSITORY_NAME = "git@github.com:feedhenry-raincatcher/raincatcher-core.git";
var LOCATION = "./core";

console.log("Linking core repository");

if (fs.existsSync(LOCATION)) {
  console.log("Core repository already exist. Pulling recent changes.");
  return pull(LOCATION, { remote: "origin", branch: "master" }, function (err) {
    if (err) {
      return console.log("Failed to pull from repository", err);
    }
    console.log("Successfully updated core repository");
  });
};

clone(REPOSITORY_NAME, "./core", { shallow: false, checkout: "master" }, function (err) {
  if (err) {
    return console.log("Failed to clone repository", err);
  }
  console.log("Successfully cloned core repository");
});

// Clone repository
function clone(repo, targetPath, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = null;
  }
  opts = opts || {};
  var git = opts.git || 'git';
  var args = ['clone'];

  if (opts.shallow) {
    args.push('--depth');
    args.push('1');
  }

  args.push('--');
  args.push(repo);
  args.push(targetPath);

  var process = spawn(git, args);
  process.on('close', function (status) {
    if (status == 0) {
      if (opts.checkout) {
        _checkout();
      } else {
        cb && cb();
      }
    } else {
      cb && cb(new Error("'git clone' failed with status " + status));
    }
  });

  function _checkout() {
    var args = ['checkout', opts.checkout];
    var process = spawn(git, args, { cwd: targetPath });
    process.on('close', function (status) {
      if (status == 0) {
        cb && cb();
      } else {
        cb && cb(new Error("'git checkout' failed with status " + status));
      }
    });
  }
}

// Pull recent changes
function pull(targetPath, opts, cb) {
  var git = opts.git || 'git';
  var args = ['pull', opts.remote, opts.branch];
  var process = spawn(git, args, { cwd: targetPath });
  process.on('close', function (status) {
    if (status == 0) {
      cb && cb();
    } else {
      cb && cb(new Error("'git pull' failed with status " + status));
    }
  });
}
