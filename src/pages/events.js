import React, { Component } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      status: "",
      isFiltered: false,
      upcomingEvents: [],
      selesaiEvents: [],
      ongoingEvents: [],
      userId: sessionStorage.getItem("userID"),
      userEmail: sessionStorage.getItem("userEmail"),
    };
  }

  componentDidMount = () => {
    this.getAllEvents();
  };

  getAllEvents = async () => {
    try {
      const eventsCollection = collection(db, "event");
      const snapshot = await getDocs(eventsCollection);
      const events = [];

      snapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() });
      });

      const upcomingEvents = events.filter(
        (event) => event.status === "upcoming"
      );
      const selesaiEvents = events.filter(
        (event) => event.status === "Selesai"
      );
      const ongoingEvents = events.filter(
        (event) => event.status === "ongoing"
      );

      console.log(events);

      this.setState({
        events: events,
        upcomingEvents: upcomingEvents,
        selesaiEvents: selesaiEvents,
        ongoingEvents: ongoingEvents,
      });
    } catch (error) {
      console.error("Error getting Events:", error);
    }
  };

  handleChange = (event) => {
    this.setState({ status: event.target.value }, () => {
      const { status } = this.state;
      if (status === "semua") {
        this.setState({ isFiltered: false });
      } else if (status === "upcoming" || status === "selesai") {
        this.setState({ isFiltered: true });
      }
    });
  };

  render() {
    const {
      events,
      upcomingEvents,
      ongoingEvents,
      selesaiEvents,
      status,
      isFiltered,
    } = this.state;

    return (
      <>
        <h4>Event List</h4>

        <div className="container">
          <div>
            <select value={status} onChange={this.handleChange}>
              <option value="">Pilih Status</option>
              <option value="semua">Semua</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>
          <div>
            <Link className="button" to={"/events/add"}>
              Tambah Event
            </Link>
          </div>
        </div>

        <hr />
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>Tanggal</th>
              <th>Jam Mulai</th>
              <th>Jam Selesai</th>
              <th>Lokasi</th>
              <th>Target Peserta</th>
              <th>Capaian Peserta</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {isFiltered ? (
              <>
                {status === "upcoming" &&
                  upcomingEvents.map((event, index) => (
                    <tr key={event.id}>
                      <td>{index + 1}</td>
                      <td>{event.judul}</td>
                      <td>{event.deskripsi}</td>
                      <td>{event.tanggal}</td>
                      <td>{event.jamMulai}</td>
                      <td>{event.jamSelesai}</td>
                      <td>{event.lokasi}</td>
                      <td>{event.targetPeserta}</td>
                      <td>{event.capaianPeserta}</td>
                      <td>{event.status}</td>
                    </tr>
                  ))}
                {status === "ongoing" &&
                  ongoingEvents.map((event, index) => (
                    <tr key={event.id}>
                      <td>{index + 1}</td>
                      <td>{event.judul}</td>
                      <td>{event.deskripsi}</td>
                      <td>{event.tanggal}</td>
                      <td>{event.jamMulai}</td>
                      <td>{event.jamSelesai}</td>
                      <td>{event.lokasi}</td>
                      <td>{event.targetPeserta}</td>
                      <td>{event.capaianPeserta}</td>
                      <td>{event.status}</td>
                    </tr>
                  ))}
                {status === "selesai" &&
                  selesaiEvents.map((event, index) => (
                    <tr key={event.id}>
                      <td>{index + 1}</td>
                      <td>{event.judul}</td>
                      <td>{event.deskripsi}</td>
                      <td>{event.tanggal}</td>
                      <td>{event.jamMulai}</td>
                      <td>{event.jamSelesai}</td>
                      <td>{event.lokasi}</td>
                      <td>{event.targetPeserta}</td>
                      <td>{event.capaianPeserta}</td>
                      <td>{event.status}</td>
                    </tr>
                  ))}
              </>
            ) : (
              events.map((event, index) => (
                <tr key={event.id}>
                  <td>{index + 1}</td>
                  <td>{event.judul}</td>
                  <td>{event.deskripsi}</td>
                  <td>{event.tanggal}</td>
                  <td>{event.jamMulai}</td>
                  <td>{event.jamSelesai}</td>
                  <td>{event.lokasi}</td>
                  <td>{event.targetPeserta}</td>
                  <td>{event.capaianPeserta}</td>
                  <td>{event.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </>
    );
  }
}

export default Event;
