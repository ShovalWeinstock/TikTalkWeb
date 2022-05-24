import defauldImg from '../defaultImage.jpg';
import avocado from '../avocado.jpg';
import grandma from '../grandma.png';
import dude from '../sheDoesntEvenGoHere.jpg';

const hardCodedContacts =
    [
        { picture: grandma, nickname: "grandma" },
        { picture: defauldImg, nickname: "roomie" },
        { picture: defauldImg, nickname: "Gili" },
        { picture: dude, nickname: "dude" },
        { picture: avocado, nickname: "Shir" }
    ];

const users = [{ username: "shoval", nickname: "shovi", password: "12345678Aa", profilePic: avocado, contacts: hardCodedContacts },
{ username: "itamar", nickname: "ita", password: "12345678Aa", profilePic: avocado, contacts: hardCodedContacts},
{ username: "Emma", nickname: "grandma", password: "12345678Aa", profilePic: grandma, contscts: [] },
{ username: "roomie", nickname: "roomie", password: "12345678Aa", profilePic: defauldImg, contscts: []},
{ username: "Gil", nickname: "Gili", password: "12345678Aa", profilePic: defauldImg, contscts: [] },
{ username: "dude", nickname: "dude", password: "12345678Aa", profilePic: dude, contscts: [] },
{ username: "Shir", nickname: "Shiruch", password: "12345678Aa", profilePic: avocado, contscts: [] }];

export default users;