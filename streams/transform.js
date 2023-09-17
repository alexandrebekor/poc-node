import { Readable, Writable, Transform } from 'node:stream'

class ReadToHundredStreams extends Readable {
  index = 1

  _read() {
    const i = this.index++

    if(i > 100) {
      this.push(null)
    } else {
      const buffer = Buffer.from(String(i))
      this.push(buffer)
    }
  }
}

class InverseStreams extends Transform {
  // obrigatoriamente temos que implementar a função transform
  // obrigatoriamente recebemos esses três argumentos
  _transform(chunck, encoding, callback) {
    const transformed = Number(chunck.toString()) * -1
    const buffer = Buffer.from(String(transformed))

    // o primeiro argumento da callback é o erro que pode ser retornado
    callback(null, buffer)
  }
}

class MultiplyByFive extends Writable {
  index = 1

  _write(chunck, encoding, callback) {
    console.log(Number(chunck.toString()) * 10)
    callback()
  }
}

const read = new ReadToHundredStreams()
const write = new MultiplyByFive()
const transform = new InverseStreams()
read.pipe(transform).pipe(write)