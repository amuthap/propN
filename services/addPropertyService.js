
import { db } from '../src/config';
import 'firebase/firestore';

export const addItem =  (item) => {
	var docName=item.toString();
    db.collection('/Properties').doc(docName).set({
        name: item
    });
}