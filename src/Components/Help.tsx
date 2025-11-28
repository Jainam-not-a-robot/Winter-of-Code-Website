import { useRecoilValue } from "recoil";
import { togglestate } from "../store/toggle";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const Help = () => {
  const toggle = useRecoilValue(togglestate);
  return (
    <div
      className={` bg-slate-100 ${toggle === null ? "" : toggle ? "contract" : "expand"}`}
    >
      <div className=" mt-[90px] mx-20 text-[40px] font-weight-400 fontstylish">
        Frequently Asked Questions
      </div>
      <div className="text-[16px] flex justify-center mt-[50px]">
        Student FAQs
      </div>
      <div className="my-5 mx-20">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            When can students apply for WoC?
          </AccordionSummary>
          <AccordionDetails>
            Please see the program timeline in How It Works section for more
            detailed information.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            What programming language(s) should I know to participate in WoC?
          </AccordionSummary>
          <AccordionDetails>
            The programming language you need to know depends with which mentor
            you are interested in working with. You should be familiar with the
            programming language(s) used in that project.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            Can I submit more than one proposal?
          </AccordionSummary>
          <AccordionDetails>
            Yes, each student may submit up to two proposals. However, only one
            per student may be accepted.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            Can a group submit a proposal together to work on a single project?
          </AccordionSummary>
          <AccordionDetails>
            While we may allow more than one student per project but it'll be
            prioritised to assign one project per person.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            Should I send proposals directly to the mentor?
          </AccordionSummary>
          <AccordionDetails>
            No, all proposals should be submitted to the program site.
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="text-[16px] flex justify-center mt-[50px]">
        Mentor FAQs
      </div>
      <div className="my-5 mx-20 border-2">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            Are mentors required to use the code produced by students?
          </AccordionSummary>
          <AccordionDetails>
            No. While we hope that all the code that comes out of this program
            is useful, it's not mandatory for the mentor to use students' code
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            Where will WoC happen?
          </AccordionSummary>
          <AccordionDetails>
            WoC occurs entirely online; you don't need to leave your room.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            Can I participate in WoC as both a mentor and a student?
          </AccordionSummary>
          <AccordionDetails>
            No. It'll not be feasible to work as both and it can hamper the
            chances of project's completion.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            What if I have more questions?
          </AccordionSummary>
          <AccordionDetails>
            Check out the Student Guide and the Mentor Guide available on the
            homepage.
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};
export default Help;
