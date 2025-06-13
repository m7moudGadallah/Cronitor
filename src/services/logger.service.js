const chalk = require('chalk');

class Logger {
  #prefix = chalk.gray('[Logger Service]');

  info(message) {
    console.log(`${this.#prefix} ${chalk.blue(`ℹ ${message}`)}`);
  }

  success(message) {
    console.log(`${this.#prefix} ${chalk.green(`✓ ${message}`)}`);
  }

  warning(message) {
    console.log(`${this.#prefix} ${chalk.yellow(`⚠ ${message}`)}`);
  }

  error(message) {
    console.log(`${this.#prefix} ${chalk.red(`✗ ${message}`)}`);
  }

  debug(message) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${this.#prefix} ${chalk.gray(`🐛 ${message}`)}`);
    }
  }

  httpRequest({ method, url, status, responseTime }) {
    const statusColor =
      status >= 500 ? chalk.red : status >= 400 ? chalk.yellow : chalk.green;

    console.log(
      [
        this.#prefix,
        chalk.cyan(method.padEnd(7)),
        url,
        statusColor(status),
        chalk.gray(`${responseTime}ms`),
        chalk.gray(new Date().toISOString()),
      ].join(' ')
    );
  }
}

module.exports = new Logger();
