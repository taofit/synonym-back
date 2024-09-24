import chalk from 'chalk';

const log = (args: any) => {
    info(args);
};

const info = (args: any) => {
    console.log(chalk.blue(`[${new Date().toLocaleString()}] [INFO]`), typeof args === 'string' ? chalk.blueBright(args) : JSON.stringify(args, null, 2));
};

const warning = (args: any) => {
    console.log(chalk.yellow(`[${new Date().toLocaleString()}] [WARN]`), typeof args === 'string' ? chalk.yellowBright(args) : JSON.stringify(args, null, 2));
};

const error = (args: any) => {
    console.log(chalk.red(`[${new Date().toLocaleString()}] [ERROR]`), typeof args === 'string' ? chalk.redBright(args) : JSON.stringify(args, null, 2));
};

export default { log, info, warning, error };
