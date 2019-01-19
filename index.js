const express = require('express')
const app = express()
const port = 3000
const _ = require('lodash')

var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'lockwire-fc640',
    clientEmail: 'firebase-adminsdk-lh7go@lockwire-fc640.iam.gserviceaccount.com',
    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDz7+6WJCcgEh7h\nxnDLT9k2rTykkQwfejmLdQhwMrQA3s9CyMG70BekylCRVhPyOGlidGeODjz5gHeN\nW4I+uk3l3AEvQQiQA2YsH7Shat3x6S/LURMBKAXpF3emBqXuYqws9K1uSy8jwLCD\ns/HsIwa9TQiuk2vt2O3xXKevGpf92IT8oz25z7K3ei9GI0pk7g77F2yvyFBE073g\nTnnmcVfUZs72rtMDOV1Qwtlk4bF1Ve++I8MBC0EHcJK7YIxwKIhVJrcFwPcGZkRz\nxq+HM0V1SAn8aU2enddlkWa33cK8LiktmQhVzfB5xfJJy9LAq7iYXOjbfniJACj1\nKrhsg3kNAgMBAAECggEAK7TISH3rRa+BeX3q3T6uAkIpTKoRZD1rvI0oSSQIhORm\n+cYLEinPZq76HwQveDV7ylBlcnoiGikWoozsCe2rAd14l90c2eLGBm9a15YUdKDN\nd64Ly+f+IRybizODPPJQe5COV2XgqRT/+2T9GkxPS5EXFmJjEt9MiLOLds/6vhgY\n8+3Uu8g2vP1Ru/RBDd/TXQRQcgCSZI/fHESe5hPtz97D1y6YK9UwZNL/zJCjI60v\n+Ceia924BYrnRUC9tb8eEi16XJ4p5oiS6VnBfSNZ6glnw94Cea/TlgAtvYll5b8p\nL+1Iu6MrgPOWhIo52bO84lJsCh18PGb1rBpKbElT8QKBgQD8lOKnU6Gqg/G0KdX7\nx/rldtoWRxOjf3VWWGykzUmBODi9IpbY9jvkT14/zwHhGTYmJp1kX+SqWmbPbxuB\n4ccyo5HQ9w2QcLAA8i+wCgptrcIc37CX4Hecnqt25D/kmefNJj6NssuEi3mJZk2N\nqvN16nG6xnkcQ0BxNUWdhftvkQKBgQD3PRjBUCqyKYksdfHs6WvwHGOiBWCSboQq\nn/v4CrtupH7fazq0WNzf07co85LT9KsbhTWSOnvfnOxE9ambgSUbNx7zeWccbB1z\nseM94y8Fwu1MJRqMUL9pphNWwLeUJZ7AB+Ng+PbleOJGUcQUvcfx4ZvsWtnZAH9M\nPpW9vvjrvQKBgQCb3VyImSk4SjfLT83Gk7+V/mPSP4Y07KCB6gsRH8VuQj1xKXkg\n5cJLv1aP1bR5Lc+md0nE+Q/ot+SduRima6c67ok7BFmQepmB2/HlliydRg51NuyI\nrHHjal6w/WUYMolCpYkQc/b3EgKr8T+GXqniaAxKj9OIx09rDM6qyFVCoQKBgFQM\nMgktfoY4dohlxAtcwrPKgthGabD93vI6lsaYp2USiIrdAgTjHJr+dwp12xkw2KYv\nX6nJNekriGpc9P6HJZ0d3Oi6AaJ44n49H9ofDBIyVMcI6gB/RsLckUBxnTbAnzn6\ntIJ3wD78HDf5feXrKjiBEKeFrv8FG0FJGVB6xlYlAoGBAJvL1IYSq43skfa4ZPvP\nOrM/TTx0ofCs032r032GnVDg6MMjx9bndfAksSum6FjVDKZbaCWo0VRajcV2GWrN\n77mq/wqlpKomTfQ3bp/z2r/gs+Egi38rHl8qFutcPRB2REtvZjz0Wq0p3mluYW3u\nounu6VxLNyzp6qETbEPPGlSy\n-----END PRIVATE KEY-----\n'
  }),
  databaseURL: 'https://lockwire-fc640.firebaseio.com'
});

var db = admin.database();
var ref = db.ref("/");

app.get('/', (req, res) => res.send('LockWire Server is running!'))

app.post('/', (req, res) => {
	res.send('Got a POST request');
	console.log('Received a post');
})


app.post('/location/:lat/:long', (req, res) =>  {
	console.log("location: ", req.params);
	var locRef = ref.child("location");
	
	let latVal = _.toNumber(req.params.lat);
	let longVal = _.toNumber(req.params.long);
	locRef.set({
	 0:
	  {
		lat: latVal,
		long:longVal
	  }
	});
	res.send("location");
});

app.post('/movement/:amt', (req, res) => {
	console.log("movement: ", req.params);
	var mvtRef = ref.child("movement");
	let amtVal = _.toNumber(req.params.amt);
	mvtRef.set({
	 0:
	  {
		amt: amtVal
	  }
	});
	res.send("movement");
});



app.listen(port, () => console.log(`LockWire Middleware  listening on port ${port}!`))
