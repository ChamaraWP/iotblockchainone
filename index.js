import express from 'express';
import rasp from './rasp';
import raspset from './raspset';
import pirsens from './pirsens';


const PORT = 3040;
let app = new express();
app.set('port',PORT);

//app = rasp(app);
//app = raspset(app);
app = pirsens(app);

app.listen(app.get('port'),() => {
		console.log(`PI NODE RUNNING ON ${app.get('port')}`);
})