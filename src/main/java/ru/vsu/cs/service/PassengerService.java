package ru.vsu.cs.service;

import java.util.List;

import ru.vsu.cs.dao.PassengerDAO;
import ru.vsu.cs.model.Passenger;

public class PassengerService {
    private static PassengerService instance;
    private PassengerService() {}
    public static PassengerService getInstance() {
        if (instance == null) {
            instance = new PassengerService();
        }
        return instance;
    }

    public List<Passenger> getAllPassengers() {
        return PassengerDAO.getAllPassengers();
    }
    public boolean addPassenger(Passenger passenger) {
        if (!validatePassenger(passenger)) {
            return false;
        }
        return PassengerDAO.addPassenger(passenger);
    }
    public boolean deletePassenger(int id) {
        return PassengerDAO.deletePassenger(id);
    }
    public int getPassengerCount() {
        return PassengerDAO.getPassengerCount();
    }
    public List<Passenger> searchPassengers(String keyword) {
        return PassengerDAO.searchPassengers(keyword);
    }
    public int getPassengerId(String usernameOrName) {
        return PassengerDAO.getPassengerId(usernameOrName);
    }
    public boolean updatePassenger(Passenger passenger) {
        if (!validatePassenger(passenger)) {
            return false;
        }
        return PassengerDAO.updatePassenger(passenger);
    }
    public Passenger getPassengerById(int id) {
        return PassengerDAO.getPassengerById(id);
    }

    private boolean validatePassenger(Passenger passenger) {
        if (passenger == null) return false;
        if (passenger.getFullName() == null || passenger.getFullName().trim().isEmpty()) return false;
        if (passenger.getUsername() == null || passenger.getUsername().trim().isEmpty()) return false;
        if (passenger.getAge() <= 0) return false;
        if (passenger.getDob() == null || passenger.getDob().trim().isEmpty()) return false;
        if (passenger.getGender() == null || passenger.getGender().trim().isEmpty()) return false;
        if (passenger.getAddress() == null || passenger.getAddress().trim().isEmpty()) return false;
        if (passenger.getContact() == null || passenger.getContact().trim().isEmpty()) return false;
        if (passenger.getIdProof() == null || passenger.getIdProof().trim().isEmpty()) return false;
        return true;
    }
} 