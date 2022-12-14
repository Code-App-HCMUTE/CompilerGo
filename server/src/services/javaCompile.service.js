var exec = require('child_process').exec;
var fs = require('fs');
var cuid = require('cuid');

const compileJava = function (envData, code, fn) {
    //creating source file
    var dirname = cuid.slug();
    const path = process.cwd() + '/temp/' + dirname;
    console.log(path);
    fs.mkdir(path, '0777', function (err) {
        if (err && exports.stats) console.log(err.toString().red);
        else {
            fs.writeFile(path + '/Main.java', code, function (err) {
                if (err && exports.stats) console.log('ERROR: '.red + err);
                else {
                    if (exports.stats) console.log('INFO: '.green + path + '/Main.java created');

                    // if (envData.OS === 'windows') var command = 'cd ' + path + ' && ' + ' javac Main.java && java Main';
                    if (envData.OS === 'windows') var command = 'cd ' + path + ' && ' + ' javac Main.java';
                    console.log(command);
                    exec(command, function (error, stdout, stderr) {
                        if (error) {
                            if (exports.stats)
                                console.log('INFO: '.green + path + '/Main.java contained an error while compiling');
                            var out = { error: stderr, mess: stdout };
                            fn(out);
                        } else {
                            console.log('INFO: '.green + 'compiled a java file');
                            var command = 'java ./temp/' + dirname + '/Main.java';
                            console.log(command, 'eyowhatup');
                            // './' + path + '
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
const compileJavaWithInput = function (envData, code, input, fn) {
    //creating source file
    var dirname = cuid.slug();
    const path = './temp/' + dirname;

    fs.mkdir(path, '0777', function (err) {
        if (err && exports.stats) console.log(err.toString().red);
        else {
            fs.writeFile(path + '/Main.java', code, function (err) {
                if (err && exports.stats) console.log('ERROR: '.red + err);
                else {
                    if (exports.stats) console.log('INFO: '.green + path + '/Main.java created');
                    fs.writeFile(path + '/input.txt', input, function (err) {
                        if (err && exports.stats) console.log('ERROR: '.red + err);
                        else {
                            if (envData.OS === 'windows') var command = 'cd ' + path + ' && ' + ' javac Main.java';
                            exec(command, function (error, stdout, stderr) {
                                if (error) {
                                    if (exports.stats)
                                        console.log(
                                            'INFO: '.green + path + '/Main.java contained an error while compiling',
                                        );
                                    var out = { error: stderr, mes: 'yo' };
                                    fn(out);
                                } else {
                                    console.log('INFO: '.green + 'compiled a java file');
                                    var command =
                                        'java ./temp/' + dirname + '/Main.java < ./temp/' + dirname + '/input.txt';
                                    console.log(command, 'yoaimo');
                                    exec(command, function (error, stdout, stderr) {
                                        if (error) {
                                            if (exports.stats) {
                                                console.log(
                                                    'INFO: '.green +
                                                        path +
                                                        '/Main.java contained an error while executing',
                                                );
                                            }
                                            if (error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1) {
                                                var out = {
                                                    error: 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.',
                                                };
                                                fn(out);
                                            } else {
                                                var out = { error: stderr, mes: 'hehe' };
                                                fn(out);
                                            }
                                        } else {
                                            if (exports.stats) {
                                                console.log(
                                                    'INFO: '.green +
                                                        path +
                                                        '/Main.java successfully compiled and executed !',
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
        }
    });
};
export const JavaCompileService = { compileJava, compileJavaWithInput };
