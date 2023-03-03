import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh"
  },
  chatContainer: {
    width: "80%",
    height: "70vh",
    overflow: "auto",
    margin: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2)
  },
  message: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginTop: theme.spacing(2),
    position: "relative",
    columnGap: "10px"
  },
  inputField: {
    marginRight: theme.spacing(2),
    flexGrow: 1
  }
}));

export default function Chat() {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      addMessage(inputValue);
      setInputValue("");
    }
  }

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  function handleEmojiSelect(emoji) {
    setInputValue(inputValue + emoji);
  }

  return (
    <div className={classes.root}>
      <Typography variant="h3">Chat</Typography>
      <List className={classes.chatContainer}>
        {messages.map((message, index) => (
          <ListItem key={index}>
            <ListItemText primary={message} className={classes.message} />
          </ListItem>
        ))}
      </List>
      <div className={classes.inputContainer}>
        <TextField
          label="Type your message"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          variant="outlined"
          className={classes.inputField}
        />

        <button
          className="emoj-btn"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <span>😀</span>
        </button>
        <div class="a7">
          {showEmojiPicker && (
            <Picker
              data={data}
              onEmojiSelect={(e) => {
                setShowEmojiPicker(!showEmojiPicker);
                handleEmojiSelect(e.native);
              }}
            />
          )}
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            addMessage(inputValue);
            setInputValue("");
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
