const util = require('util');
const chalk = require('chalk');

class Logger {
  #prefix = `${chalk.gray(`[Logger Service @ ${new Date().toISOString()}]`)}`;

  #formatMessage(message) {
    if (typeof message === 'object') {
      try {
        return (
          '\n' +
          util.inspect(message, {
            colors: true,
            depth: 4,
            compact: false,
            showHidden: false,
          })
        );
      } catch (err) {
        return '\n' + chalk.red('[Unable to inspect object]');
      }
    }
    return message;
  }

  info(message) {
    console.log(
      `${this.#prefix} ${chalk.blue(`ℹ ${this.#formatMessage(message)}`)}`
    );
  }

  success(message) {
    console.log(
      `${this.#prefix} ${chalk.green(`✓ ${this.#formatMessage(message)}`)}`
    );
  }

  warning(message) {
    console.log(
      `${this.#prefix} ${chalk.yellow(`⚠ ${this.#formatMessage(message)}`)}`
    );
  }

  error(message) {
    console.log(
      `${this.#prefix} ${chalk.red(`✗ ${this.#formatMessage(message)}`)}`
    );
  }

  debug(message) {
    if (process.env?.NODE_ENV === 'dev') {
      console.log(
        `${this.#prefix} ${chalk.gray(`🐛 ${this.#formatMessage(message)}`)}`
      );
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
