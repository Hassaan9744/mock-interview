import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interiew-Ready with AI-Powered Practice and FeedBack</h2>
          <p className="text-lg">
            Practive real Interview questions and get instant feedback on your
            answers.
          </p>
          <Button asChild className="btn-primary  max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robot-img"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
          <p>You have no interviews.</p>
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take a Interview</h2>
        <div className="interviews-section">
          <p>There are no interviews available.</p>
        </div>
      </section>
    </>
  );
};

export default Page;
