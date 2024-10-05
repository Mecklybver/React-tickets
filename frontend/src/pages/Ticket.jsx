import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import {
  getOneTicket,
  closeTicket,
  reset,
} from "../features/tickets/ticketSlice";
import {
  getNotes,
  createNote,
  reset as noteReset,
} from "../features/notes/noteSlice";
import BackButton from "../components/BackButton";
import { toast } from "react-toastify";
import NoteItem from "../components/NoteItem";
import Spinner from "../components/Spinner";

const customStyles = {
  context: {
    width: '400px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");


  const { isLoading, isError, message, ticket } = useSelector(
    (state) => state.tickets
  );

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );

  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getOneTicket(ticketId));
    dispatch(getNotes(ticketId));
    // eslint-disable-next-line
  }, [ticketId, isError, message]);

  const onClick = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }));
    closeModal();
  };

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h3>Something Went Wrong</h3>;
  }

  return (
    <div className="ticket-page">
      <header>
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date submitted: {new Date(ticket.createdAt).toLocaleString("en-GB")}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>
      {ticket.status !== "closed" && (
        <button className="btn" onClick={openModal}><FaPlus />Add Note </button>
      )}
      <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={closeModal}
        contentLabel="Add Note">
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>X</button>
        <form
         onSubmit={onNoteSubmit}
        ></form>
        </Modal>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
          <br />
      {ticket.status !== "closed" && (
        <footer>
          <div className="actions">
            <button className="btn btn-block btn-danger" onClick={onClick}>
              Close Ticket
            </button>
            <br />
          </div>
        </footer>
      )}
    </div>
  );
}
export default Ticket;
