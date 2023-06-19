import App from "./app";
import connection from "./database";
App.listen(App.get('port'));
console.log('Server Port: ', App.get('port'));