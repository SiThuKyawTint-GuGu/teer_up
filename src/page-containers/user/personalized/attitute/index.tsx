import QuestionPageCard from "../components/QuestionPageCard";
import RadioButton from "../components/RadioButton";

const AttitudePage = () => {
  return (
    <QuestionPageCard title="When it comes to a fulfilling career journey, I prefer to be...">
      <div className="bg-[#fefefe] p-5 flex flex-col flex-wrap">
        <div className="grid grid-cols-3 p-5 place-items">
          <div className="w-full h-full flex items-center justify-center text-[16px] font-[600]">
            Good at many things
          </div>
          <div>
            <div className="w-full h-full flex flex-col justify-center items-center">
              <div className="w-[1px] h-[128px] border-[1px] border-[#BBC7D6]"></div>
              <div className="text-[14px] font-[300]">Or</div>
              <div className="w-[1px] h-[128px] border-[1px] border-[#BBC7D6]"></div>
            </div>
          </div>
          <div className="w-full h-full flex items-center justify-center text-[16px] font-[600]">
            Exceptional at one or a few things
          </div>
        </div>
        <div className="flex items-center gap-1">
          <RadioButton />
          <div className="h-[1px] w-[77px] border-[1px] border-[#BBC7D6]" />
          <RadioButton />
          <div className="h-[1px] w-[77px] border-[1px] border-[#BBC7D6]" />
          <RadioButton />
          <div className="h-[1px] w-[77px] border-[1px] border-[#BBC7D6]" />
          <RadioButton />
        </div>
        <div className="flex justify-between items-start">
          <div>Agree alot</div>
          <div>Agree a little</div>
          <div>Agree a little</div>
          <div>Agree alot</div>
        </div>
      </div>
      <div className="text-center text-slateGray text-[14px] font-[300]">
        Tips: If both fit, choose one you agree with more. If neither fits, choose the one you’re
        closest to agreeing with.
      </div>
    </QuestionPageCard>
  );
};

export default AttitudePage;
