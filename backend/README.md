# Backend – Greenn Challenge

RESTful API built with Laravel for producer management, authentication, ranking, and integration with the React frontend.

---

## 🛠️ Technologies Used

<table>
	<tr>
		<td align="center"><img src="../frontend/public/tech-logos/php-logo.png" width="40"/><br/>PHP 8.x</td>
		<td align="center"><img src="../frontend/public/tech-logos/laravel-logo.png" width="40"/><br/>Laravel 10</td>
		<td align="center"><img src="../frontend/public/tech-logos/eloquentORM-logo.png" width="100"/><br/>Eloquent ORM</td>
		<td align="center"><img src="../frontend/public/tech-logos/sanctum-logo.png" width="100"/><br/>Sanctum</td>
		<td align="center"><img src="../frontend/public/tech-logos/phpunit-logo.png" width="100"/><br/>PHPUnit</td>
	</tr>
</table>

---

## 🚀 How to Run the Backend

```bash
cd backend
composer install
cp .env.example .env
# Configure the .env file as needed (database, mail, etc)
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

The API will be available at `http://localhost:8000`.

---

## 🔑 Authentication

- Uses Laravel Sanctum for token-based authentication.
- Protected endpoints require the token in the header: `Authorization: Bearer <token>`.

---

## 📚 Main Endpoints

- `POST /api/login` – Login and obtain token
- `POST /api/logout` – Logout
- `GET /api/producers` – List all producers
- `POST /api/producers` – Create a new producer
- `PUT /api/producers/{id}` – Update a producer
- `DELETE /api/producers/{id}` – Delete a producer
- `GET /api/producers/ranking` – List producers ordered by score

---

## 🏆 Score Calculation

The score for each producer is calculated using the following formula:

$$
\begin{align*}
S_{\text{year}} &= \text{direct\_sales\_last\_year} + \text{indirect\_sales\_last\_year} \\[8pt]
S_{\text{month}} &= \text{direct\_sales\_last\_month} + \text{indirect\_sales\_last\_month} \\[8pt]
F &= \text{followers\_instagram} \\[8pt]
T &=
\begin{cases}
1 & \text{if } \text{is\_trending} = \text{true} \\
0 & \text{if } \text{is\_trending} = \text{false}
\end{cases}
\\[12pt]
	ext{score}_{\text{month}} &= \min\left(100,\ \dfrac{S_{\text{month}}}{5\,000\,000} \times 100\right) \\[12pt]
	ext{score}_{\text{year}} &= \min\left(100,\ \dfrac{S_{\text{year}}}{100\,000\,000} \times 100\right) \\[12pt]
	ext{score}_{\text{followers}} &= \dfrac{\log_{10}(F + 1)}{\log_{10}(20\,000\,000)} \times 100 \\[12pt]
	ext{score}_{\text{trending}} &= T \times 100 \\[18pt]
\boxed{\text{relevance\_score}} &=
0.30 \times \text{score}_{\text{month}} \\
&\quad + 0.25 \times \text{score}_{\text{year}} \\
&\quad + 0.25 \times \text{score}_{\text{followers}} \\
&\quad + 0.20 \times \text{score}_{\text{trending}}
\end{align*}
$$

- **Successful deliveries:** Total deliveries completed without issues.
- **Average rating:** Average of customer ratings (0 to 5).
- **Complaints:** Total complaints registered for the producer.

> Adjust the formula above according to your project's real logic!

---

## 🧪 Automated Tests

Run the tests with:

```bash
php artisan test
```

Example of successful test output:

```
 PASS  Tests\Feature\ProducerTest
 ✓ it lists all producers
 ✓ it creates a new producer
 ✓ it updates a producer
 ✓ it deletes a producer
 ✓ it calculates the score correctly

 Tests:  5 passed
 Time:   1.23s
```

---

## 📄 Structure

- `app/Models/Producer.php` – Main producer model
- `app/Http/Controllers/ProducerController.php` – Endpoint logic
- `database/seeders/ProducerSeeder.php` – Example data
- `routes/api.php` – API routes

---

## 👩‍💻 Author

Developed by Leonardo Florentino Fernandes for the Greenn technical challenge.
