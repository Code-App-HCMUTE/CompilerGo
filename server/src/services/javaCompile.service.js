var exec = require('child_process').exec;
var fs = require('fs');
var cuid = require('cuid');
var colors = require('colors');

const compileJava = function (envData, code, fn) {
    //creating source file
    var dirname = cuid.slug();
    const path = process.cwd() + '\\temp\\' + dirname;
    console.log(path);
    fs.mkdir(path, '0777', function (err) {
        if (err && exports.stats) console.log(err.toString().red);
        else {
            fs.writeFile(path + '/Main.java', code, function (err) {
                if (err && exports.stats) console.log('ERROR: '.red + err);
                else {
                    if (exports.stats) console.log('INFO: '.green + path + '/Main.java created');

                    if (envData.OS === 'windows') var command = 'cd ' + path + ' && ' + ' javac Main.java && java Main';
                    console.log(command);
                    exec(command, function (error, stdout, stderr) {
                        if (error) {
                            if (exports.stats)
                                console.log('INFO: '.green + path + '/Main.java contained an error while compiling');
                            var out = { error: stderr };
                            fn(out);
                        } else {
                            console.log('INFO: '.green + 'compiled a java file');
                            var command = 'cd ' + path + ' & java Main';
                            exec(command, function (error, stdout, stderr) {
                                if (error) {
                                    if (error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1) {
                                        var out = {
                                            error: 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.',
                                        };
                                        fn(out);
                                    } else {
                                        if (exports.stats) {
                                            console.log(
                                                'INFO: '.green + path + '/Main.java contained an error while executing',
                                            );
                                        }
                                        var out = { error: stderr };
                                        fn(out);
                                    }
                                } else {
                                    if (exports.stats) {
                                        console.log(
                                            'INFO: '.green + path + '/Main.java successfully compiled and executed !',
                                        );
                                    }
                                    var out = { output: stdout };
                                    fn(out);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

export const JavaCompileService = { compileJava };