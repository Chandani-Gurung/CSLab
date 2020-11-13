import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Container,
  Divider,
  Avatar,
  makeStyles,
  Typography,
} from "@material-ui/core";
import getInitials from "../../bodyTA/ActivityLogTA/getInitials";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import baseURL from "./../../../baseURL";
import moment from "moment";
import jwt_decode from "jwt-decode";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "30px",
    height: "30px",
  },
}));

const message = (props) => {
  const [messages, setMessages] = useState(null);
  const [message, setMessage] = useState("");

  const classes = useStyles();

  useEffect(() => {
    fetchMessages();
  });

  function fetchMessages() {
    fetch(
      `${baseURL}/api/users/${props.message.senderId}/Messages/thread/${props.message.recipientId}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMessages(data);
      })
      .catch((err) => console.log("The error is ", err));
  }

  const handleSend = () => {
    var currentUserId = props.message.senderId;

    var objToSend = {
      recipientId: props.message.recipientId,
      content: message,
    };

    if (message === "") alert("Something went wrong");

    fetch(`${baseURL}/api/users/${currentUserId}/Messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objToSend),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMessage("");
      })
      .catch((err) => console.log("The error is ", err));
  };

  return (
    <div>
      <Container style={{ width: 1000, paddingLeft: "0px" }}>
        <div className="card">
          <ArrowBackIcon
            style={{ margin: 15 }}
            onClick={() => window.location.reload()}
          />
          <div className="card-body">
            {messages != null
              ? messages.map((item) => {
                  return (
                    <div className="chat-body">
                      <div className="header">
                        <strong className="primary-font">
                          <Avatar className={classes.avatar}>
                            {item.senderName !== null
                              ? getInitials(item.senderName)
                              : ""}
                          </Avatar>
                          {item.senderName}{" "}
                        </strong>

                        <small className="text-muted">
                          <span className="fa fa-clock-o">
                            {moment(item.messageSent).fromNow()}
                          </span>
                        </small>
                      </div>
                      <p>{item.content}</p>
                      <br />
                      <Divider />
                    </div>
                  );
                })
              : ""}
          </div>
          <div>
            <form>
              <div className="input-group">
                <TextField
                  id="outlined-multiline-static"
                  label="Message"
                  multiline
                  rows={2}
                  value={message}
                  variant="outlined"
                  style={{ width: "85%", margin: 10 }}
                  onChange={(event) => setMessage(event.target.value)}
                />
                <div className="input-group-append">
                  <Button
                    className="btn btn-primary"
                    style={{ margin: 20, height: 40 }}
                    onClick={handleSend}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default message;
