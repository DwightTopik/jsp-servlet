package ru.vsu.cs.service;

import java.util.List;

import ru.vsu.cs.dao.TrainScheduleDAO;
import ru.vsu.cs.model.TrainSchedule;

public class TrainScheduleService {
    private static TrainScheduleService instance;
    private TrainScheduleService() {}
    public static TrainScheduleService getInstance() {
        if (instance == null) {
            instance = new TrainScheduleService();
        }
        return instance;
    }

    public List<TrainSchedule> getAllTrainSchedules() {
        return TrainScheduleDAO.getAllTrainSchedules();
    }
    public int getTrainCount() {
        return TrainScheduleDAO.getTrainCount();
    }
    public List<String> getAllOrigins() {
        return TrainScheduleDAO.getAllOrigins();
    }
    public List<String> getAllDestinations() {
        return TrainScheduleDAO.getAllDestinations();
    }
    public List<TrainSchedule> searchTrains(String origin, String destination) {
        return TrainScheduleDAO.searchTrains(origin, destination);
    }
} 