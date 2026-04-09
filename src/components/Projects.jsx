import React from "react";
import project from "./data/projects.json";

const Projects = () => {
  return (
    <>
      <div className="container projects my-3" id="projects">
        <h1>PROJECTS</h1>
        <div className="row justify-content-center">
          {project.map((data) => (
            <div
              key={data.id}
              className="col-12 col-md-6 col-lg-4 my-4 d-flex align-items-stretch"
            >
              <div
                className="card bg-dark text-light custom-project-card w-100 h-100"
                style={{
                  border: "1px solid var(--border-color)",
                }}
                data-aos="flip-right"
                data-aos-duration="1000"
              >
                <div className="img d-flex justify-content-center align-content-center p-3">
                  <img
                    src={data.imageSrc}
                    className="card-img-top"
                    alt={data.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div className="card-body text-center d-flex flex-column">
                  <h5 className="card-title">{data.title}</h5>
                  <p className="card-text flex-grow-1">{data.description}</p>
                  <a href={data.source} className="btn custom-btn mt-auto">
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;
