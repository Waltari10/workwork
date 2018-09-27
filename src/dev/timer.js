const timer = {
  start: () => {
    this.start = Date.now()
  },
  end: () => {
    /* eslint-disable-line no-console */
    console.log(Date.now() - this.start)
  },
}


module.exports = timer
