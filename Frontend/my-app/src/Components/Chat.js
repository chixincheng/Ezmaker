import Talk from "talkjs";



const Chat = (self, user, container) => {
  Talk.ready.then(async () => {
   
    var me = new Talk.User({
      id: self._id,
      name: self.userName,
      email: self.email,
      photoUrl:
        "https://res.cloudinary.com/daufq6nuh/image/upload/v1632600315/CampusBuy/AccLogo_nu5f2n.png",
      welcomeMessage: "Hey there! How are you? :-)",
      role: "default",
    });
    window.talkSession = new Talk.Session({
      appId: process.env.REACT_APP_APP_ID,
      me: me,
    });

    var other = new Talk.User({
      id: user._id,
      name: user.userName,
      email: user.email,
      photoUrl: "https://res.cloudinary.com/daufq6nuh/image/upload/v1632600315/CampusBuy/AccLogo_nu5f2n.png",
      welcomeMessage: "Hey, how can I help?",
      role: "default",
    });

    var conversation = window.talkSession.getOrCreateConversation(
      Talk.oneOnOneId(me, other)
    );

    conversation.setParticipant(me);
    conversation.setParticipant(other);
    var inbox = window.talkSession.createInbox({ selected: conversation });
    inbox.mount(container.current);
  });

 
};
export default Chat;
