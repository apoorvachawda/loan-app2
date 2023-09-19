package com.example.loanapp.model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.ManyToOne;
import java.sql.Date;
import java.time.LocalDate;

@Entity
@Table(name="employee_card_details")
public class EmployeeCard {	
	@Id
	@Column(length=6, nullable=false, unique=true)
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private Long card_id; 
	@ManyToOne
	private Employee employee;

	@ManyToOne
	private Loan loan;
	
	private LocalDate card_issue_date;

	public Long getCard_id() {
		return card_id;
	}

	public void setCard_id(Long card_id) {
		this.card_id = card_id;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public Loan getLoan() {
		return loan;
	}

	public void setLoan(Loan loan) {
		this.loan = loan;
	}

	public LocalDate getCard_issue_date() {
		return card_issue_date;
	}

	public void setCard_issue_date(LocalDate card_issue_date) {
		this.card_issue_date = card_issue_date;
	}
	
}
