import React, {useState} from 'react';
import {Comment, Header, Segment} from "semantic-ui-react";
import EventDetailedChatForm from "./EventDetailedChatForm";
import {Link} from "react-router-dom";
import {formatDistance} from 'date-fns';

const EventDetailedChat = ({addEventComment, eventId, eventChat}) => {
  const [replyFormOpen, setReplyFormOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const handleReplyComment = (id) => () => {
    setReplyFormOpen(true);
    setSelectedCommentId(id);
  }

  const handleCloseReplyForm = () => {
    setSelectedCommentId(null);
    setReplyFormOpen(false);
  }

  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: 'none' }}
      >
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached>
        <Comment.Group>
          {eventChat && eventChat.map(comment => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.photoURL || "/assets/user.png"} />
              <Comment.Content>
                <Comment.Author as={Link} to={`people/${comment.uid}`}>{comment.displayName}</Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistance(comment.date, Date.now())}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.text}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action onClick={handleReplyComment(comment.id)}>Reply</Comment.Action>
                  {replyFormOpen && selectedCommentId === comment.id &&
                  <EventDetailedChatForm form={`reply_${comment.id}`}
                                         addEventComment={addEventComment}
                                         eventId={eventId}
                                         handleCloseReplyForm={handleCloseReplyForm}
                                         parentId={comment.id}
                  />}
                </Comment.Actions>
              </Comment.Content>
              <Comment.Group>
                {comment.childNodes && comment.childNodes.map(child => (
                  <Comment key={child.id}>
                    <Comment.Avatar src={child.photoURL || "/assets/user.png"} />
                    <Comment.Content>
                      <Comment.Author as={Link} to={`people/${child.uid}`}>{child.displayName}</Comment.Author>
                      <Comment.Metadata>
                        <div>{formatDistance(child.date, Date.now())}</div>
                      </Comment.Metadata>
                      <Comment.Text>{child.text}</Comment.Text>
                      <Comment.Actions>
                        {/*<Comment.Action onClick={handleReplyComment(child.id)}>Reply</Comment.Action>*/}
                        {/*{replyFormOpen && selectedCommentId === child.id &&*/}
                        {/*<EventDetailedChatForm form={`reply_${child.id}`}*/}
                        {/*                       addEventComment={addEventComment}*/}
                        {/*                       eventId={child.id}*/}
                        {/*                       handleCloseReplyForm={handleCloseReplyForm}*/}
                        {/*                       parentId={child.id}*/}
                        {/*/>}*/}
                      </Comment.Actions>
                    </Comment.Content>
                  </Comment>
                ))}
              </Comment.Group>
            </Comment>
          ))}
        </Comment.Group>
        <EventDetailedChatForm form='newComment'
                               addEventComment={addEventComment}
                               eventId={eventId}
                               parentId={0}
        />
      </Segment>
    </>
  );
};

export default EventDetailedChat;
