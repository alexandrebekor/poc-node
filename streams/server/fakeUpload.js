import { Readable } from "node:stream";

class Read extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    if (i > 100) {
      this.push(null);
    } else {
      setTimeout(() => {
        const buf = Buffer.from(String(i) + "\n");
        this.push(buf);
      }, 0);
    }
  }
}

fetch("http://localhost:3333", {
  method: "POST",
  body: new Read(),
  duplex: "half",
})
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    console.log(data);
  });
