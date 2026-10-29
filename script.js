const fitnessForm = document.getElementById("fitnessForm");

const goalNames = {
    weightLoss: "Weight Loss",
    muscle: "Muscle Growth",
    endurance: "Endurance",
    healthy: "Healthy Physique"
};

const plans = {
    weightLoss: {
        workouts: [
            ["Monday", "Full Body Circuit", "Strength"],
            ["Tuesday", "Brisk Walk / Jog", "Cardio"],
            ["Wednesday", "Lower Body + Core", "Strength"],
            ["Thursday", "Rest / Easy Walk", "Recovery"],
            ["Friday", "Intervals", "Cardio"],
            ["Saturday", "Long Easy Cardio", "Cardio"],
            ["Sunday", "Stretching", "Recovery"]
        ],
        exercises: [
            ["🚶", "Brisk Walking", "Low-impact cardio that supports a steady calorie burn."],
            ["🏋️", "Bodyweight Squats", "Build lower-body strength and support daily movement."],
            ["💪", "Incline Push-Ups", "A beginner-friendly upper-body strength exercise."],
            ["🔥", "Mountain Climbers", "A full-body movement to raise your heart rate."],
            ["🦵", "Reverse Lunges", "Train the legs while improving balance and control."],
            ["🧘", "Full Body Stretch", "Cool down and maintain comfortable mobility."]
        ],
        nutrition: [
            ["🍳", "Breakfast", "Greek yogurt, oats and fruit for protein and lasting energy."],
            ["🥗", "Lunch", "Lean protein, vegetables and a moderate portion of whole grains."],
            ["🍎", "Snack", "Fruit with yogurt or a small handful of nuts."],
            ["🥘", "Dinner", "Half a plate of vegetables with protein and whole-food carbohydrates."]
        ],
        summary: "Use a modest calorie deficit, prioritize protein and choose mostly whole foods. Avoid crash diets."
    },
    muscle: {
        workouts: [
            ["Monday", "Full Body Strength", "Strength"],
            ["Tuesday", "Mobility & Light Cardio", "Recovery"],
            ["Wednesday", "Upper Body Strength", "Strength"],
            ["Thursday", "Rest / Recovery", "Rest"],
            ["Friday", "Lower Body Strength", "Strength"],
            ["Saturday", "Full Body Training", "Strength"],
            ["Sunday", "Recovery & Stretching", "Recovery"]
        ],
        exercises: [
            ["🏋️", "Squats", "Build lower-body strength with controlled repetitions."],
            ["💪", "Push-Ups", "Train the chest, shoulders and triceps."],
            ["🏋️", "Rows", "Strengthen the back and arms."],
            ["🦵", "Lunges", "Develop leg strength and balance."],
            ["🔥", "Plank", "Build core stability for stronger movement."],
            ["💪", "Shoulder Press", "Strengthen the shoulders and upper body."]
        ],
        nutrition: [
            ["🍳", "Breakfast", "Eggs or yogurt with oats, fruit and whole-grain toast."],
            ["🍚", "Lunch", "Rice or potatoes with chicken, beans or tofu and vegetables."],
            ["🥛", "Post-workout", "Milk or yogurt with fruit to support recovery."],
            ["🥘", "Dinner", "Protein, vegetables and whole-food carbohydrates for recovery."]
        ],
        summary: "Eat enough protein throughout the day and include a small calorie surplus if muscle gain is your priority."
    },
    endurance: {
        workouts: [
            ["Monday", "Easy Cardio", "Cardio"],
            ["Tuesday", "Mobility Training", "Mobility"],
            ["Wednesday", "Tempo Cardio", "Cardio"],
            ["Thursday", "Rest / Recovery", "Rest"],
            ["Friday", "Intervals", "Cardio"],
            ["Saturday", "Long Easy Activity", "Cardio"],
            ["Sunday", "Stretching", "Recovery"]
        ],
        exercises: [
            ["🚶", "Brisk Walking", "Build an aerobic base at a sustainable pace."],
            ["🏃", "Jogging", "Improve cardiovascular capacity gradually."],
            ["🚴", "Cycling", "A low-impact way to train endurance."],
            ["🪢", "Jump Rope", "Develop coordination and cardiovascular fitness."],
            ["🏃", "Intervals", "Alternate harder and easier efforts."],
            ["❤️", "Step-Ups", "Combine cardio with lower-body strength."]
        ],
        nutrition: [
            ["🍌", "Before training", "A banana, toast or oats for accessible energy."],
            ["🍚", "Main meal", "Whole grains, vegetables and lean protein."],
            ["🥛", "Recovery", "Carbohydrates plus protein after longer sessions."],
            ["🥗", "Dinner", "A balanced meal with vegetables and adequate fluids."]
        ],
        summary: "Match carbohydrate portions to training demands, drink water regularly and increase training gradually."
    },
    healthy: {
        workouts: [
            ["Monday", "Full Body Workout", "Fitness"],
            ["Tuesday", "Walking + Mobility", "Cardio"],
            ["Wednesday", "Bodyweight Training", "Strength"],
            ["Thursday", "Rest / Recovery", "Rest"],
            ["Friday", "Full Body Workout", "Fitness"],
            ["Saturday", "Cardio + Mobility", "Cardio"],
            ["Sunday", "Recovery & Stretching", "Recovery"]
        ],
        exercises: [
            ["🚶", "Walking", "Accessible cardiovascular activity for everyday health."],
            ["🏃", "Light Jogging", "Build cardiovascular fitness at a comfortable pace."],
            ["🏋️", "Bodyweight Squats", "Build lower-body strength."],
            ["💪", "Push-Ups", "Build upper-body strength."],
            ["🔥", "Plank", "Improve core stability."],
            ["🧘", "Stretching", "Support mobility and recovery."]
        ],
        nutrition: [
            ["🍳", "Breakfast", "Whole grains, fruit and a protein-rich food."],
            ["🍚", "Lunch", "Grains, vegetables and a protein source."],
            ["🍎", "Snack", "Fruit, yogurt, nuts or another balanced snack."],
            ["🥘", "Dinner", "Vegetables, grains and a protein source."]
        ],
        summary: "Build balanced meals around vegetables, fruit, protein, whole grains and water."
    }
};

fitnessForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const age = Number(document.getElementById("age").value);
    const height = Number(document.getElementById("height").value);
    const weight = Number(document.getElementById("weight").value);
    const activity = document.getElementById("activity").value;
    const selectedGoal = document.querySelector('input[name="goal"]:checked').value;
    const bmi = weight / ((height / 100) ** 2);
    const bodyType = getBodyType(bmi);

    document.getElementById("resultAge").textContent = `${age} yrs`;
    document.getElementById("resultHeight").textContent = `${height} cm`;
    document.getElementById("resultWeight").textContent = `${weight} kg`;
    document.getElementById("resultBodyType").textContent = bodyType;
    document.getElementById("resultGoal").textContent = goalNames[selectedGoal];

    generateWorkout(selectedGoal, activity);
    generateExercises(selectedGoal);
    generateNutrition(selectedGoal, bodyType);

    const dashboard = document.getElementById("dashboard");
    dashboard.classList.remove("hidden");
    dashboard.scrollIntoView({ behavior: "smooth" });
});

function getBodyType(bmi) {
    if (bmi < 18.5) return "Lean";
    if (bmi < 25) return "Healthy range";
    if (bmi < 30) return "Higher range";
    return "Very high range";
}

function generateWorkout(goal, activity) {
    const workoutList = document.getElementById("workoutList");
    const workouts = plans[goal].workouts.map((workout) => [...workout]);

    if (activity === "beginner") {
        workouts.forEach((workout) => {
            if (workout[2] === "Strength") workout[1] = `Beginner ${workout[1]}`;
        });
    }

    workoutList.innerHTML = workouts.map((workout) => `
        <div class="workout-item">
            <div class="workout-day">${workout[0]}</div>
            <div>
                <div class="workout-name">${workout[1]}</div>
                <div class="workout-type">${workout[2]}</div>
            </div>
            <div class="workout-badge">${workout[2]}</div>
        </div>
    `).join("");
}

function generateExercises(goal) {
    document.getElementById("exerciseGrid").innerHTML = plans[goal].exercises.map((exercise) => `
        <div class="exercise-card">
            <div class="exercise-image">${exercise[0]}</div>
            <div class="exercise-content">
                <h3>${exercise[1]}</h3>
                <p>${exercise[2]}</p>
            </div>
        </div>
    `).join("");
}

function generateNutrition(goal, bodyType) {
    const plan = plans[goal];
    document.getElementById("nutritionSummary").textContent =
        `${plan.summary} Your profile is currently classified as ${bodyType} using BMI as a general screening measure.`;
    document.getElementById("nutritionGrid").innerHTML = plan.nutrition.map((meal) => `
        <div class="nutrition-card">
            <span>${meal[0]}</span>
            <h3>${meal[1]}</h3>
            <p>${meal[2]}</p>
        </div>
    `).join("");
}
