# SOC 2 Type II Compliance Declaration

**Framework:** Trust Services Criteria (TSC 2017, as revised 2022)  
**Scope:** Security, Availability, and Confidentiality

## Control Mappings

- **CC6.1 (Logical Access Controls):** Access control policies enforced via GitHub permissions, explicit code reviews, and authenticated endpoint boundaries.
- **CC6.6 (Boundary Protection):** Infrastructure isolated via containerized deployment (`infra/Dockerfile`) and Kubernetes Service definitions (`infra/k8s-deployment.yaml`).
- **CC7.1 (System Monitoring & Anomaly Detection):** Automated readiness monitoring via Kubernetes readiness probes (`/health`).
- **CC7.2 (Vulnerability & Patch Management):** Automated dependency auditing (`npm audit`) and containerized execution using minimal Alpine Linux base images.
- **A1.2 (Availability & System Operational Capacity):** Automated container restart policies and multi-replica deployment manifests for resilient operational capacity.
