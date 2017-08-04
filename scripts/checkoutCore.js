#!/usr/bin/env node
var spawn = require('child_process').spawn;
var yargs = require('yargs');
var fs = require('fs');

var REPO_URL = "https://github.com/feedhenry-raincatcher/raincatcher-core.git";
var LOCATION = "./core";

function cloneHandler(argv) {
  if (fs.existsSync(LOCATION)) {
    console.log("Core repository already exist.");
    return;
  }
  console.log("Linking core repository using branch:", argv.branch);
  return clone(REPO_URL, "./core", { shallow: argv.shallow, checkout: argv.branch },
    function(err) {
      if (err) {
        console.log("Failed to clone repository", err);
        return process.exit(1);
      }
      console.log("Successfully cloned core repository");
    });
}

function pullHandler(argv) {
  return pull(LOCATION, { remote: "origin", branch: argv.branch }, function(err) {
    if (err) {
      console.log("Failed to pull from repository", err);
      return process.exit(1);
    }
    console.log("Successfully updated core repository");
  });
}

yargs
  .usage('Usage: $0 <command>')
  .alias('b', 'branch')
  .default('branch', 'master')
  .command('clone', 'clone the core repository', function(yargs) {
    yargs.alias('s', 'shallow');
  }, cloneHandler)
  .command('pull', 'pull latest changes', function() {
  }, pullHandler)
  .demandCommand()
  .help()
  .argv;

// Clone repository
function clone(repo, targetPath, opts, cb) {
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
  process.on('close', function(status) {
    if (status === 0) {
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
    process.on('close', function(status) {
      if (status === 0) {
        cb && cb();
      } else {
        cb && cb(new Error("'git checkout' failed with status " + status));
      }
    });
  }
}

function pull(targetPath, opts, cb) {
  var git = opts.git || 'git';
  var args = ['pull', opts.remote, opts.branch];
  var process = spawn(git, args, { cwd: targetPath });
  process.on('close', function(status) {
    if (status === 0) {
      cb && cb();
    } else {
      cb && cb(new Error("'git pull' failed with status " + status));
    }
  });
}
