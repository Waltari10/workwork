const timer = {
  start: () => {
    this.start = Date.now()
  },
  end: () => {
    /* eslint-disable no-console */
    console.log(Date.now() - this.start)
  },
}


module.exports = timer
