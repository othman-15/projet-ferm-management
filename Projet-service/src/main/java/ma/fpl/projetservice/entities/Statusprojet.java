package ma.fpl.projetservice.entities;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Statusprojet {
    PLANIFIE,
    EN_COURS,
    SUSPENDU,
    TERMINE,
    ANNULE;

}
