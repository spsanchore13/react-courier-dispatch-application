// import data from "../../submissionData.json"; // do not create/change  this file

const data = [
  {
    submission_link: "http://localhost:3000",
    id: "shanti-local",
    json_server_link: "http://localhost:8080",
  },
];

data.forEach(({ submission_link: url, id, json_server_link: server_url }) => {
  describe("Courier Dispatch Application", function () {
    let acc_score = 1;
    beforeEach(() => {
      Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });

      // cy.writeFile("db.json", mock, (err) => {
      //   if (err) {
      //     console.error(err);
      //   }
      // });
      //cy.wait(1000);
    });

    it("Should have an application title visible along with the form", () => {
      cy.visit(url);
      cy.get("h1").should("contain", "Calculate shipping rates");
      cy.get("form").should("exist");
      cy.then(() => {
        acc_score += 1;
      });
    });

    it("Should be able to check the courier details for Forward Type", () => {
      cy.intercept("POST", "**/courier/charges").as("getCourierCharges");
      cy.visit(url);
      cy.get("input[name=weight]").clear().type(1);
      cy.get("input[name=pinCode]").clear().type(486886);
      cy.get("select").select("Forward");
      cy.get(`.show_charges`).should("not.exist");
      cy.get("form").submit();
      cy.wait("@getCourierCharges");
      cy.get(`.show_charges`).should("exist");
      cy.get(".show_charges h3").eq(0).should("contain", `Forward`);
      cy.get(".show_charges h3").eq(1).should("contain", 486886);
      cy.get(".show_charges h3").eq(2).should("contain", 67.8);
      cy.get(".show_charges h3").eq(3).should("contain", 1);
      //2nd check
      cy.get("input[name=weight]").clear().type(2);
      cy.get("input[name=pinCode]").clear().type(673002);
      cy.get("select").select("Forward");
      cy.get(`.show_charges`).should("not.exist");
      cy.get("form").submit();
      cy.wait("@getCourierCharges");
      cy.get(`.show_charges`).should("exist");
      cy.get(".show_charges h3").eq(0).should("contain", `Forward`);
      cy.get(".show_charges h3").eq(1).should("contain", 673002);
      cy.get(".show_charges h3").eq(2).should("contain", 139.85);
      cy.get(".show_charges h3").eq(3).should("contain", 2);
      cy.then(() => {
        acc_score += 2;
      });
    });

    it("Should be able to check the courier details for ForwardAndRTO Type", () => {
      cy.intercept("POST", "**/courier/charges").as("getCourierCharges");
      cy.visit(url);
      cy.get("input[name=weight]").clear().type(1);
      cy.get("input[name=pinCode]").clear().type(324005);
      cy.get("select").select("ForwardAndRTO");
      cy.get(`.show_charges`).should("not.exist");
      cy.get("form").submit();
      cy.wait("@getCourierCharges");
      cy.get(`.show_charges`).should("exist");
      cy.get(".show_charges h3").eq(0).should("contain", `Forward`);
      cy.get(".show_charges h3").eq(1).should("contain", 324005);
      cy.get(".show_charges h3").eq(2).should("contain", 81.8);
      cy.get(".show_charges h3").eq(3).should("contain", 1);
      //2nd check
      cy.get("input[name=weight]").clear().type(3);
      cy.get("input[name=pinCode]").clear().type(173212);
      cy.get("select").select("ForwardAndRTO");
      cy.get(`.show_charges`).should("not.exist");
      cy.get("form").submit();
      cy.wait("@getCourierCharges");
      cy.get(`.show_charges`).should("exist");
      cy.get(".show_charges h3").eq(0).should("contain", `Forward`);
      cy.get(".show_charges h3").eq(1).should("contain", 173212);
      cy.get(".show_charges h3").eq(2).should("contain", 384.8);
      cy.get(".show_charges h3").eq(3).should("contain", 3);
      cy.then(() => {
        acc_score += 2;
      });
    });

    it("Form is getting reset after submitting the courier details and the ShowCharges component exists on the DOM", () => {
      cy.intercept("POST", "**/courier/charges").as("getCourierCharges");
      cy.visit(url);
      cy.get("input[name=weight]").clear().type(1);
      cy.get("input[name=pinCode]").clear().type(324005);
      cy.get("select").select("ForwardAndRTO");
      cy.get(`.show_charges`).should("not.exist");
      cy.get("form").submit();
      cy.wait("@getCourierCharges");
      cy.get(`.show_charges`).should("exist");
      cy.get("input[name=weight]").should("have.value", "");
      cy.get("input[name=pinCode]").should("have.value", "");
      cy.get("select").should("have.value", "");
      cy.then(() => {
        acc_score += 1;
      });
    });

    it("Whenever the user re-enters the form the ShowCharges should not exist on the DOM", () => {
      cy.intercept("POST", "**/courier/charges").as("getCourierCharges");
      cy.visit(url);
      cy.get("input[name=weight]").clear().type(1);
      cy.get("input[name=pinCode]").clear().type(324005);
      cy.get("select").select("ForwardAndRTO");
      cy.get(`.show_charges`).should("not.exist");
      cy.get("form").submit();
      cy.wait("@getCourierCharges");
      cy.get(`.show_charges`).should("exist");
      cy.get("input[name=weight]").clear().type(100);
      cy.get(`.show_charges`).should("not.exist");
      cy.then(() => {
        acc_score += 1;
      });
    });

    it("Loading indicator should exist on the DOM between req and res of the server", () => {
      cy.intercept("POST", "**/courier/charges", (req) => {
        req.reply((res) => {
          res.delay = 2000;
        });
      }).as("getCourierCharges");
      cy.visit(url);
      cy.get("input[name=weight]").clear().type(1);
      cy.get("input[name=pinCode]").clear().type(324005);
      cy.get("select").select("ForwardAndRTO");
      cy.get(`.show_charges`).should("not.exist");
      cy.get("form").submit();
      cy.get(".loading_indicator").should("exist");
      cy.wait("@getCourierCharges").then(() => {
        cy.get(".loading_indicator").should("not.exist");
      });
      cy.then(() => {
        acc_score += 1;
      });
    });

    it("if pin code does not exist then it should show error message received from server", () => {
      cy.intercept("POST", "**/courier/charges").as("getCourierCharges");
      cy.visit(url);
      cy.get("input[name=weight]").clear().type(1);
      cy.get("input[name=pinCode]").clear().type(343041);
      cy.get("select").select("ForwardAndRTO");
      cy.get(`.show_charges`).should("not.exist");
      cy.get("form").submit();

      cy.wait("@getCourierCharges").then(() => {
        cy.get("form").should("exist");
        cy.get('[data-cy="error_message"]').should(
          "contain",
          "Sorry for the inconvenience!, Service not available for this pin code."
        );
      });
      cy.then(() => {
        acc_score += 1;
      });
    });

    it(`generate score`, () => {
      console.log("final score:", acc_score);
      ////////////// this should not be changed
      let result = {
        id,
        marks: Math.ceil(acc_score),
      };
      result = JSON.stringify(result);
      cy.writeFile("results.json", `\n${result},`, { flag: "a+" }, (err) => {
        if (err) {
          console.error(err);
        }
      });
      //////////////////
    });
  });
});
