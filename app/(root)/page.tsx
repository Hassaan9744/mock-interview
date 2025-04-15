import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import {
  getCurrentUser,
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/auth.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const user = await getCurrentUser();

  const [userInterviews, latestInterviews] = await Promise.all([
    user?.id ? await getInterviewsByUserId(user.id) : [],
    user?.id ? await getLatestInterviews({ userId: user.id }) : [],
  ]);

  const hasUserInterviews = userInterviews && userInterviews.length > 0;
  const hasLatestInterviews = latestInterviews && latestInterviews.length > 0;
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
          {hasUserInterviews ? (
            userInterviews.map((interview) => (
              <InterviewCard
                {...interview}
                key={interview.id}
                title={interview.role}
                date={new Date(interview.createdAt).toLocaleDateString()}
                status={interview.finalized ? "Finalized" : "Pending"}
              />
            ))
          ) : (
            <p>You have no interviews.</p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take a Interview</h2>
        <div className="interviews-section">
          {hasLatestInterviews ? (
            latestInterviews.map((interview) => (
              <InterviewCard
                {...interview}
                key={interview.id}
                title={interview.role}
                date={new Date(interview.createdAt).toLocaleDateString()}
                status={interview.finalized ? "Finalized" : "Pending"}
              />
            ))
          ) : (
            <p>There are not any interviews available.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
