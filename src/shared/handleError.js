import chalk from 'chalk';

const log = console.log;
const red = chalk.red;
const yellow = chalk.yellowBright;
const gray = chalk.gray;

function handleError(err) {
    log(red.bold('Error!'));
    log(gray('---'));
    log(`${red(err.name)} of type ${red(err.type)}`);
    log(`on ${red(err.fileName)}, ${red(`${err.columnNumber}:${err.lineNumber}`)}`);
    log(gray('---'));
    log(yellow(err.message));
    log(gray('---'));
    log(yellow(err.cause));
    log(gray('---'));
}

export default handleError;

