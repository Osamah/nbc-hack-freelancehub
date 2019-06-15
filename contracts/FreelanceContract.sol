pragma solidity ^0.5.0;

contract FreelanceHub {

    enum JobStatus { ongoing, completed }

    struct Job {
        JobStatus status;
        address owner;
        uint fee;
        address[] freelancers;
    }

    uint256 public numJobs = 0;
    mapping(uint256 => Job) public jobs;

    constructor() public {}

    function createJob(
        uint256 fee
    ) public returns(uint256 jobId) {
        uint256 actualFee = fee * 1000000000000000000;
        require(actualFee > 100 finney, "Minimum amount necessary to create a job is 0.1 ETH");
        jobId = ++numJobs;
        Job memory newJob = Job(
            JobStatus.ongoing,
            msg.sender,
            actualFee,
            new address[](0)
        );
        jobs[jobId] = newJob;
    }

    // function startJob(uint256 jobId, address payable freelancerWallet) public {
    //     Job memory job = jobs[jobId];
    //     require(job.status == JobStatus.ongoing, "This job is already completed");
    //     require(job.freelancers.length <= 5, "Maximum amount of freelancers are already working on this job");
    //     job.freelancers.push(freelancerWallet);
    // }

    // function finishJob(uint256 jobId, address payable freelancerWallet) public {
    //     Job memory job = jobs[jobId];
    //     for (uint i = 0; i < job.freelancers.length; i++) {
    //         if (freelancerWallet == job.freelancers[i]) {
    //             freelancerWallet.transfer(job.fee);
    //         }
    //     }
    // }

    function finishJob(uint256 jobId, address payable freelancerWallet) public {
        Job memory job = jobs[jobId];

        freelancerWallet.transfer(job.fee);
    }
}