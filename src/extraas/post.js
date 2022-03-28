// // 
//         let formdata = new FormData()
//         formdata.append('email', user.email)
//         formdata.append('username', user.email)
//         formdata.append('secret', user.uid)

//         getFile(user.photoURL)
//         .then(avatar => {
//           formdata.append('avatar', avatar, avatar.name)

//           axios.post(
//             'https://api.chatengine.io/users/',
//             formdata,
//             { headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY }}
//           )
//           .then(() => setLoading(false))
//           .catch(e => console.log('e', e.response))