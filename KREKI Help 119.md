# **Project Spec: KREKI Help 119** 

## **1\. Project Goal & Philosophy**

Goal: Build a "Gojek-style" emergency response platform connecting victims with the nearest trained volunteers (relawan) within a 3km radius to reduce emergency response latency.  
Philosophy: Inclusive, open platform for various organizations (KREKI, PMI, IDI), democratizing access to basic life support (BHD).

## **2\. Milestones (Phased Approach)**

* **Milestone 1 (MVP):** Core Emergency Loop (Trigger \-\> Broadcast \-\> Accept \-\> Guide). Focus on mobile app for Requester/Volunteer and basic Admin Map.  
* **Milestone 2 (Future):** Video Telemedicine (Fasmedas integration) and complex billing.

## **3\. Product Requirements ("The What")**

### **3.1 User Roles & Stories**

* **Requester (Public):**  
  * "As a user, I want to press a single Panic Button to broadcast my location so help arrives quickly."  
  * "As a bystander, I want AI-guided first aid instructions (Chat/Voice) while waiting for volunteers."  
* **Volunteer (Relawan):**  
  * "As a volunteer, I want to receive loud push notifications for emergencies within 3km."  
  * "As a volunteer, I want to 'Accept' a request and see navigation to the victim."  
  * "As a volunteer, I want to earn points/badges for responding to emergencies."  
* **Admin:**  
  * "As a dispatcher, I want to view active incidents on a live map."

### **3.2 Core Features & Acceptance Criteria**

* **Intelligent Emergency Alerting:**  
  * \[ \] System captures GPS immediately on panic button press.  
  * \[ \] System queries database for volunteers within **3km radius**.  
  * \[ \] Notification delivered to relevant volunteers within **5 seconds**.  
  * \[ \] **Constraint:** Multiple volunteers must be able to accept a single request (N-to-1 relationship).  
* **AI-Assisted First Aid:**  
  * \[ \] App displays "Emergency Mode" UI upon trigger.  
  * \[ \] AI Chatbot provides specific CPR/BHD guidance (e.g., "Is patient breathing?").  
  * \[ \] **Constraint:** Must function in offline/low-signal mode (pre-cached basics).  
* **AED Locator:**  
  * \[ \] Map layer displays nearest registered Defibrillators (AEDs).

## **4\. Engineering Design ("The How")**

### **4.1 Tech Stack Recommendations**

* **Mobile App:** **React Native** (Expo) with TypeScript.  
  * *Reason:* Cross-platform (iOS/Android), fast iteration, extensive geolocation library support.  
* **Backend:** **Node.js (NestJS)**.  
  * *Reason:* Scalable microservices, strong TypeScript support for shared types with frontend.  
* **Database:**  
  * Primary: **PostgreSQL** with **PostGIS** extension (Required for geospatial radius queries).  
  * Caching/Real-time: **Redis** (Session state and volunteer location tracking).  
* **AI Integration:** OpenAI API or Anthropic Claude API (accessed via backend proxy).  
* **Infrastructure:** Kubernetes (K8s) for microservices orchestration.

### **4.2 Architecture Overview**

* **Geospatial Matcher Service:** Dedicated microservice handling PostGIS queries (ST\_DWithin) to find volunteers.  
* **Notification Engine:** Handles high-priority push notifications (FCM/APNS) with override-silent-mode capability.  
* **Real-time Layer:** WebSocket (Socket.io) connection for tracking volunteer movement towards the victim on the Requester's screen.

### **4.3 Constraints & Non-Negotiables**

* **Latency:** Critical path (Alert \-\> Notification) must be under 5 seconds.  
* **Privacy:** Volunteer location is only tracked/broadcast when they are "Active" or responding to a case.  
* **Resilience:** App must not crash if GPS signal is intermittent; fallback to last known location.