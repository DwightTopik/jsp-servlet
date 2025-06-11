package ru.vsu.cs.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import ru.vsu.cs.dao.BookingDAO;
import ru.vsu.cs.dao.PassengerDAO;
import ru.vsu.cs.model.Booking;

public class BookingService {
    private static BookingService instance;
    private BookingService() {}
    public static BookingService getInstance() {
        if (instance == null) {
            instance = new BookingService();
        }
        return instance;
    }

    public String generatePNR() {
        return UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    public boolean saveBooking(Booking booking) {
        if (!validateBooking(booking)) {
            return false;
        }
        if (booking.getSeatNumber() == null || booking.getSeatNumber().isEmpty()) {
            booking.setSeatNumber("S-" + (new Random().nextInt(100) + 1));
        }
        if (booking.getPnr() == null || booking.getPnr().isEmpty()) {
            booking.setPnr(generatePNR());
        }
        return BookingDAO.saveBooking(booking);
    }

    public List<Booking> getAllBookings() {
        return BookingDAO.getAllBookings();
    }

    public List<Booking> parseBookings(String jsonData) {
        List<Booking> bookings = new ArrayList<>();
        if (jsonData == null || jsonData.isEmpty()) {
            return bookings;
        }
        jsonData = jsonData.replace("[", "").replace("]", "").trim();
        String[] bookingEntries = jsonData.split("\\},\\{");
        for (String entry : bookingEntries) {
            entry = entry.replace("{", "").replace("}", "").trim();
            String[] keyValuePairs = entry.split(",");
            Booking booking = new Booking();
            for (String pair : keyValuePairs) {
                String[] keyValue = pair.split(":", 2);
                if (keyValue.length != 2) continue;
                String key = keyValue[0].trim().replace("\"", "");
                String value = keyValue[1].trim().replace("\"", "");
                switch (key) {
                    case "passengerId":
                        int passengerId = PassengerDAO.getPassengerId(value);
                        booking.setPassengerId(passengerId);
                        break;
                    case "passengerName":
                        booking.setPassengerName(value);
                        break;
                    case "trainNo":
                        booking.setTrainNo(value);
                        break;
                    case "trainName":
                        booking.setTrainName(value);
                        break;
                    case "travelDate":
                        booking.setTravelDate(value);
                        break;
                    case "trainClass":
                        booking.setTrainClass(value);
                        break;
                    case "seat":
                        booking.setSeat(value);
                        break;
                    case "status":
                        booking.setStatus(value);
                        break;
                    case "price":
                        booking.setPrice(Double.parseDouble(value));
                        break;
                    case "seatPreference":
                        booking.setSeatPreference(value);
                        break;
                    case "foodPreference":
                        booking.setFoodPreference(value);
                        break;
                }
            }
            bookings.add(booking);
        }
        return bookings;
    }

    public int getTotalBookingsCount() {
        return BookingDAO.getTotalBookingsCount();
    }
    public List<Booking> getLatestBookings(int limit) {
        return BookingDAO.getLatestBookings(limit);
    }
    public Booking getBookingByPNR(String pnr) {
        return BookingDAO.getBookingByPNR(pnr);
    }
    public boolean deleteBooking(String pnr) {
        return BookingDAO.deleteBooking(pnr);
    }

    private boolean validateBooking(Booking booking) {
        return booking != null && booking.getPassengerId() > 0 && booking.getTrainNo() != null && !booking.getTrainNo().isEmpty();
    }
} 