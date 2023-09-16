import { Readable } from 'node:stream'

// process.stdin.pipe(process.stdout)

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    if(i > 100) {
      // o método push é utilizado pela stream para fornecer informações para quem está utlizando a stream
      this.push(null)
    } else {
      // O Buffer não aceita números, apenas strings
      const buffer = Buffer.from(String(i) + '\n')
      // uma stream não pode retornar dados em formato primitivo, ele deve estar em Buffer
      this.push(buffer)
    }
  }
}

new OneToHundredStream().pipe(process.stdout)